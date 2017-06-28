class LessonSerializer < ActiveModel::Serializer
  attributes :id, :complete, :content_type, :slug, :title, :url,
            :next_lesson_id, :previous_lesson_id
  has_many :notes
  has_many :tags
  belongs_to :student
end
