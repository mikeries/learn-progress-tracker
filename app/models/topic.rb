class Topic < CurriculumElement
  has_many :units
  has_many :lessons, through: :units

  def units=(units_hash)
    units_hash.each { |unit_hash| self.units.build(unit_hash) }
  end

  def completed_lessons
    lessons.inject(0) {|sum, lesson| sum += 1 if lesson.complete}
  end

end
