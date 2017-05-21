class LessonTag < ApplicationRecord
  belongs_to :tag
  belongs_to :lesson
  validates_associated :tag
end
