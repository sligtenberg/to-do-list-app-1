class ListsController < ApplicationController

  def create
    new_list = List.create!(list_params)
    new_user_list = @current_user.user_lists.create!(list: new_list, owner: true, participant: true)
    render json: new_user_list, include: ['list.tasks'], status: :created
  end

  # def update
  #   list = find_list
  #   list.update!(list_params)
  #   render json: list
  # end

  def destroy
    find_list.destroy
  end

  private

  def find_list
    @current_user.lists.find(params[:id])
  end

  # strong params
  def list_params
    params.permit(:name, :tasks)
  end

end
