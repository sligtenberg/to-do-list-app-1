class User < ApplicationRecord
  has_secure_password

  has_many :user_lists, dependent: :destroy
  has_many :lists, through: :user_lists
  has_many :tasks, through: :lists

  validates :username, presence: true
  validates :username, uniqueness: true

  def owned_lists
    self.user_lists.select { |user_list| user_list.owner }.map { |user_list| user_list.list }
  end
end
