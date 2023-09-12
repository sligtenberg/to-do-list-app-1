class TasksController < ApplicationController

  def create
    task = find_list.tasks.create!(task_params)
    render json: task, status: :created
  end

  def update
    task = find_task
    task.update!(task_params)
    render json: task
  end

  def destroy
    find_task.destroy
  end

  private

  # probably this is where the checks for owner, participant, read only should take place
  def find_task
    @current_user.tasks.find(params[:id])
  end

  def find_list
    @current_user.lists.find(params[:list_id])
  end

  # strong params
  def task_params
    params.permit(:id, :description, :completed)
  end

end
