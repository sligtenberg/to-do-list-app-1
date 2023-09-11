class Task < ApplicationRecord
  belongs_to :list

  validates :description, presence: true, uniqueness: { scope: :list, case_sensitive: false }
end
