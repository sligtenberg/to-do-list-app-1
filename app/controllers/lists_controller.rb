class ListsController < ApplicationController

  def create
    new_list = List.create!(list_params)
    new_user_list = @current_user.user_lists.create!(list: new_list, owner: true)
    render json: new_user_list, include: ['list.tasks', 'list.user_lists.user'], status: :created
  end

  def destroy
    list = find_owned_list(list_params[:id].to_i)
    if list
      list.destroy
    else
      render_non_ownership_message
    end
  end

  private

  # strong params
  def list_params
    params.permit(:name, :tasks, :id)
  end

end
