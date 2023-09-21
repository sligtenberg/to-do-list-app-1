class UserListsController < ApplicationController

  def create
    list = find_owned_list(user_list_params[:list_id].to_i)
    if list
      user_list = UserList.create!(user: find_user, list: list, owner: user_list_params[:owner])
      render json: user_list, status: :created
    else
      render_non_ownership_message
    end
  end

  def update
    user_list = find_owned_user_list
    if user_list
      user_list.update!(user_list_params)
      render json: user_list, status: :created
    else
      render_non_ownership_message
    end
  end

  def destroy
    user_list = find_owned_user_list
    if user_list
      user_list.destroy
    else
      render_non_ownership_message
    end
  end

  private

  def find_user
    User.find_by(username: user_list_params[:username])
  end

  def find_owned_user_list
    @owned_lists.map { |list| list.user_lists } .flatten.find { |user_list| user_list.id == user_list_params[:id].to_i }
  end

  # strong params
  def user_list_params
    params.permit(:id, :username, :list_id, :owner)
  end

end
