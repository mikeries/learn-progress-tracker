class Lesson < CurriculumElement
  belongs_to :unit
  has_many :notes
  has_many :lesson_tags
  has_many :tags, through: :lesson_tags

  LEARN_ROOT = 'https://learn.co/tracks/full-stack-web-dev-with-react/'

  def url
    LEARN_ROOT + unit.topic.slug + '/' + unit.slug + '/' + self.slug
  end

  def status
    return "Completed" if self.complete
    return "Incomplete" if not self.complete
  end
end
