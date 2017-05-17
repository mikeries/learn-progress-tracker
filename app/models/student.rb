class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, :omniauth_providers => [:facebook]
  has_many :notes
  has_many :lessons, through: :notes
  has_many :tracks

  def self.from_omniauth(auth)
   where(provider: auth.provider, uid: auth.uid).first_or_create do |student|
     student.email = auth.info.email
     student.password = Devise.friendly_token[0,20]
   end
  end
end
