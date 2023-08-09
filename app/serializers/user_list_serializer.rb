class UserListSerializer < ActiveModel::Serializer
  attributes :id, :owner, :participant
  has_one :user
  has_one :list
end
