class Unit < CurriculumElement
  belongs_to :topic
  has_many :lessons

  def lessons=(lessons_hash)
    lessons_hash.each { |lesson_hash| lessons.build(lesson_hash) }
  end

  def student_id=(student_id)
    super(student_id)
    lessons.each { |lesson| lesson.student_id = student_id }
  end

  def completed_lessons
    lessons.select(&complete).count
  end
end
