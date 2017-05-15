class Lesson < CurriculumElement
  has_many :student_lessons
  belongs_to :unit

end
