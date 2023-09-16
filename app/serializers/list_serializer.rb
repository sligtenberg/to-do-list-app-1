class ListSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :tasks
  has_many :user_lists
end
