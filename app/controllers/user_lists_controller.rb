class UserListsController < ApplicationController

  def create
    debugger
    user_list = UserList.create!(user: find_user, list: find_list, owner: user_list_create_params[:owner])
    render json: user_list, status: :created
  end

  def update
    user_list = find_user_list
    user_list.update!(user_list_update_params)
    render json: user_list, status: :created
  end

  def destroy
    find_user_list.destroy
  end

  private

  # probably this is where the checks for owner, participant, read only should take place
  # current_user => lists => user_list
  def find_user_list
    UserList.find(user_list_update_params[:id])
  end

  def find_user
    User.find_by(username: user_list_create_params[:username])
  end

  def find_list
    List.find(user_list_create_params[:list_id])
  end

  # strong params
  def user_list_update_params
    params.permit(:id, :owner)
  end

  def user_list_delete_params
    params.permit(:id)
  end

  def user_list_create_params
    params.permit(:username, :list_id, :owner)
  end

end
