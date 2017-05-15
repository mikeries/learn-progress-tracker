class Topic < CurriculumElement
  has_many :units
  has_many :lessons, through: :units
end
