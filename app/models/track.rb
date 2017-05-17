class Track < CurriculumElement
  belongs_to :student
  has_many :topics
  has_many :units, through: :topics
  has_many :lessons, through: :units

  def topics=(topics_hash)
    topics_hash.each { |topic_hash| self.topics.build(topic_hash) }
  end

  def completed_lessons
    lessons.select {|lesson| lesson.complete}.count
  end

end
