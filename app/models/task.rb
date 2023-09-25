class Task < ApplicationRecord
  belongs_to :list

  validates_inclusion_of :completed, in: [true, false]
  validates :description, presence: true, uniqueness: { scope: :list, case_sensitive: false }
end
