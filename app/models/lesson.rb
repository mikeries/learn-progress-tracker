class Lesson < CurriculumElement
  has_many :student_lessons
  belongs_to :unit

  LEARN_ROOT = 'https://learn.co/tracks/full-stack-web-dev-with-react/'

  def url
    LEARN_ROOT + unit.topic.slug + '/' + unit.slug + '/' + self.slug
  end
end
