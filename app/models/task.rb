class Task < ApplicationRecord
  belongs_to :list

  validates :description, uniqueness: { scope: :list }
end
