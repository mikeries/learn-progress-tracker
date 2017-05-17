class Lesson < CurriculumElement
  has_many :notes
  belongs_to :unit

  LEARN_ROOT = 'https://learn.co/tracks/full-stack-web-dev-with-react/'

  def url
    LEARN_ROOT + unit.topic.slug + '/' + unit.slug + '/' + self.slug
  end

  def status
    return "Completed" if self.complete
    return "Incomplete" if not self.complete
  end
end
