class Unit < CurriculumElement
  belongs_to :topic
  has_many :lessons

  
end
