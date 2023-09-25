class TasksController < ApplicationController

  before_action :find_owned_task, only: [:update, :destroy]
  before_action only: :create do
    find_owned_list(task_params[:list_id].to_i)
  end

  def create
    task = @owned_list.tasks.create!(task_params)
    render json: task, status: :created
  end

  def update
    task = @owned_task
    task.update!(task_params)
    render json: task
  end

  def destroy
    @owned_task.destroy
  end

  private

  def find_owned_task
    @owned_task = @current_user.owned_lists.map { |list| list.tasks }.flatten.find { |task| task.id == task_params[:id].to_i }
    render_non_ownership_message unless @owned_task
  end

  # strong params
  def task_params
    params.permit(:id, :description, :completed, :list_id)
  end

end
