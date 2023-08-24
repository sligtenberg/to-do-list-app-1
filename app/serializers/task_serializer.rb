class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed
  
  belongs_to :list
end
