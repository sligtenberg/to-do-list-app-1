class User < ApplicationRecord
  has_secure_password

  has_many :user_lists
  has_many :lists, through: :user_lists
  has_many :tasks, through: :lists

  validates :username, uniqueness: true
end
