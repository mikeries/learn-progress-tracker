class Topic < CurriculumElement
  has_many :units
  has_many :lessons, through: :units

  def units=(units_hash)
    units_hash.each { |unit_hash| self.units.build(unit_hash) }
  end
end
