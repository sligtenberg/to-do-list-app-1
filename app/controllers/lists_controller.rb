class ListsController < ApplicationController

  before_action only: :destroy do
    find_owned_list(list_params[:id].to_i)
  end

  def create
    new_list = List.create!(list_params)
    new_user_list = @current_user.user_lists.create!(list: new_list, owner: true)
    render json: new_user_list, include: ['list.tasks', 'list.user_lists.user'], status: :created
  end

  def destroy
    @owned_list.destroy
  end

  private

  # strong params
  def list_params
    params.permit(:name, :tasks, :id)
  end

end
