class Tag < ApplicationRecord
  has_many :lesson_tags
  has_many :lessons, through: :lesson_tags
  validates :category, presence: true, allow_blank: false
  validates :category, length: {maximum: 20, message: "is too long"}

end
