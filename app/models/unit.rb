class Unit < CurriculumElement
  belongs_to :topic
  has_many :lessons

  def lessons=(lessons_hash)
    lessons_hash.each { |lesson_hash| self.lessons.build(lesson_hash) }
  end
end
