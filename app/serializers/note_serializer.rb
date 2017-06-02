class NoteSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :content, :lesson_id
end
