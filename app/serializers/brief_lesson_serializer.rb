class BriefLessonSerializer < ActiveModel::Serializer
  attributes :id, :complete, :content_type, :title
end