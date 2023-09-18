class UserList < ApplicationRecord
  belongs_to :user
  belongs_to :list

  validates :user, uniqueness: { scope: :list }
end
