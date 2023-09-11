class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed
end
