class UserListSerializer < ActiveModel::Serializer
  attributes :id, :owner, :participant
  belongs_to :user
  belongs_to :list
end
