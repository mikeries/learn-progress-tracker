class TopicSerializer < ActiveModel::Serializer
  attributes :id, :complete, :content_type, :slug, :title
  has_many :units
end
