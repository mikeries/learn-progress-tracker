class Lesson < CurriculumElement
  belongs_to :unit
  has_many :notes
  has_many :lesson_tags
  has_many :tags, through: :lesson_tags

  LEARN_ROOT = 'https://learn.co/tracks/'

  def url
    LEARN_ROOT + unit.topic.track.slug + '/' + unit.topic.slug + '/' + unit.slug + '/' + self.slug
  end

  def tags_attributes=(tags_attributes)
    tags_attributes.each do |k, tag_attr|
        unless tag_attr.nil?
          tag_category = tag_attr[:category]
          if !tag_category.empty?
            tag = Tag.find_or_create_by(category: tag_category)
            self.tags << tag
          end
        end
      end
  end

end
