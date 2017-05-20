class Note < ApplicationRecord
  belongs_to :student
  belongs_to :lesson
  validates :content, presence:true, allow_blank: false
  validates :content, length: {minimum: 10}

end
