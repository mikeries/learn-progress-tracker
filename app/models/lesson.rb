class Lesson < CurriculumElement
  belongs_to :unit
  has_many :notes
  has_many :lesson_tags
  has_many :tags, through: :lesson_tags

  LEARN_ROOT = 'https://learn.co/tracks/full-stack-web-dev-with-react/'

  def url
    LEARN_ROOT + unit.topic.slug + '/' + unit.slug + '/' + self.slug
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

  def status
    return "Completed" if self.complete
    return "Incomplete" if not self.complete
  end
end
