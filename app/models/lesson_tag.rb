class LessonTag < ApplicationRecord
  belongs_to :tag
  belongs_to :lesson
end
