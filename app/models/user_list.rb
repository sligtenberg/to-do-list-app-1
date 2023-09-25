class UserList < ApplicationRecord
  belongs_to :user
  belongs_to :list

  validates_inclusion_of :owner, in: [true, false]
  validates :list, uniqueness: { scope: :user }
end
