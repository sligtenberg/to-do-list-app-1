class UserListsController < ApplicationController

  before_action :user_list_authorization, only: [:update, :destroy]
  before_action only: :create do
    list_authorization(user_list_params[:list_id].to_i)
  end

  def create
    user_list = UserList.create!(user: find_user, list: @owned_list, owner: user_list_params[:owner])
    render json: user_list, status: :created
  end

  def update
    user_list = @owned_user_list
    user_list.update!(user_list_params)
  end

  def destroy
    @owned_user_list.destroy
  end

  private

  def find_user
    User.find_by(username: user_list_params[:username])
  end

  def user_list_authorization
    @owned_user_list = @owned_lists.map { |list| list.user_lists } .flatten.find { |user_list| user_list.id == user_list_params[:id].to_i }
    render_non_ownership_message unless @owned_user_list
  end

  # strong params
  def user_list_params
    params.permit(:id, :username, :list_id, :owner)
  end

end
