class Lesson < CurriculumElement
  belongs_to :student
  belongs_to :unit
  has_many :lessons

end
