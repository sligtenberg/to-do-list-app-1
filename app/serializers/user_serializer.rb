class UserSerializer < ActiveModel::Serializer
  attributes :username

  has_many :user_lists
end
