class UserListsController < ApplicationController

  # def create
  #   user_list = User_lists.create!(user_list_params)
  #   render json: user_list, status: :created
  # end

  def update
    user_list = find_user_list
    user_list.update!(user_list_params)
    render json: user_list
  end

  def destroy
    find_user_list.destroy
  end

  private

  # probably this is where the checks for owner, participant, read only should take place
  def find_user_list
    UserList.find(params[:id])
  end

  # strong params
  def user_list_params
    params.permit(:id, :owner)
  end

end
