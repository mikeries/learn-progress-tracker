class Lesson < CurriculumElement
  belongs_to :student
  belongs_to :unit
  has_many :notes
  has_many :lesson_tags, inverse_of: :lesson
  has_many :tags, through: :lesson_tags, autosave: true
  validates_associated :tags

  LEARN_ROOT = 'https://learn.co/tracks/'

  def url
    LEARN_ROOT + unit.topic.track.slug + '/' + unit.topic.slug + '/' + unit.slug + '/' + self.slug
  end

  def tags_attributes=(tags_attributes)
    tags_attributes.each do |k, tag_attr|
        unless tag_attr.nil?
          tag_category = tag_attr[:category].strip.capitalize
          if !tag_category.blank?
            tag = self.tags.find_or_initialize_by(category: tag_category)
            add_tag_validation_errors(tag) if self.invalid?
          end
        end
      end
  end

  def next_lesson_id
    student.lessons.where('id > ?', self.id).first
  end

  def previous_lesson_id
    student.lessons.where('id < ?', self.id).last
  end

  def add_tag_validation_errors(tag)
    tag.errors.full_messages.each {|message| self.errors[:base] << message}
  end
end
