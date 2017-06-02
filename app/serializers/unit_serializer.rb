class UnitSerializer < ActiveModel::Serializer
  attributes :id, :complete, :content_type, :slug, :title
  has_many :lessons
end
