class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,  :validatable
  # validates :name, presence: true, uniqueness: true
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
end
