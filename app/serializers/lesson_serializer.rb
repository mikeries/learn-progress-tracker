class LessonSerializer < ActiveModel::Serializer
  attributes :id, :complete, :content_type, :slug, :title, :url
  has_many :notes
  has_many :tags
end
