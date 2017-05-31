class Topic < CurriculumElement
  belongs_to :track
  has_many :units
  has_many :lessons, through: :units

  def units=(units_hash)
    units_hash.each { |unit_hash| units.build(unit_hash) }
  end

  def student_id=(student_id)
    super(student_id)
    units.each { |unit| unit.student_id = student_id }
  end

  def completed_lessons
    lessons.select{ |lesson| lesson.complete }.count
  end

end
