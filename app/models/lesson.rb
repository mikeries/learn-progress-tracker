class Lesson < CurriculumElement
  belongs_to :student
  belongs_to :unit
  has_many :notes
  has_many :lesson_tags, inverse_of: :lesson
  has_many :tags, through: :lesson_tags, autosave: true
  validates_associated :tags

  LEARN_ROOT = 'https://learn.co/tracks/'

  def url
    LEARN_ROOT + unit.topic.track.slug + '/' + unit.topic.slug + 
      '/' + unit.slug + '/' + self.slug
  end

  def tags_attributes=(tags_attributes)
    tags_attributes.each do |k, tag_attr|
      unless tag_attr.nil?
        tag_category = tag_attr[:category].strip.capitalize
        if !tag_category.blank?
          self.tags.find_or_initialize_by(category: tag_category)
        end
      end
    end
  end

  def next_lesson_id
    next_lesson = student.lessons.where('id > ?', self.id).first
    return next_lesson.id if next_lesson
    nil
  end

  def previous_lesson_id
    previous_lesson = student.lessons.where('id < ?', self.id).last
    return previous_lesson.id if previous_lesson
    nil
  end
end
