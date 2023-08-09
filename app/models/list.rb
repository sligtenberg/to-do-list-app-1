class List < ApplicationRecord
  has_many :user_lists
  has_many :lists, through: :user_lists
  has_many :tasks

  validates :name, uniqueness: { scope: :user}
end
