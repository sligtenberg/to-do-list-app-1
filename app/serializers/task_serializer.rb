class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_date, :completed
  has_one :list
end
