class Track < CurriculumElement
  belongs_to :student
  has_many :topics
  has_many :units, through: :topics
  has_many :lessons, through: :units

  def topics=(topics_hash)
    topics_hash.each { |topic_hash| topics.build(topic_hash) }
  end

  def student_id=(student_id)
    super(student_id)
    topics.each { |topic| topic.student_id = student_id }
  end

  def completed_lessons
    lessons.select(&complete).count
  end

end
