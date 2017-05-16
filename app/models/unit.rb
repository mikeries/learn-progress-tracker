class Unit < CurriculumElement
  belongs_to :topic
  has_many :lessons

  def lessons=(lessons_hash)
    lessons_hash.each { |lesson_hash| self.lessons.build(lesson_hash) }
  end

  def completed_lessons
    lessons.inject(0) {|sum, lesson| sum += 1 if lesson.complete}
  end
end
