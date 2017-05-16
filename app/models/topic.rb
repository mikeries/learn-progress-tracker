class Topic < CurriculumElement
  has_many :units
  has_many :lessons, through: :units

  def units=(units_hash)
    units_hash.each { |unit_hash| self.units.build(unit_hash) }
  end

  def completed_lessons
    #lessons.inject(0) {|sum, lesson| sum = sum + 1 if lesson.complete }

    # sum = 0
    # units.each {|unit| sum = sum + unit.completed_lessons }
    # sum
    lessons.select {|lesson| lesson.complete}.count
  end

end
