class UserListSerializer < ActiveModel::Serializer
  attributes :id, :owner
  belongs_to :user
  belongs_to :list
end
