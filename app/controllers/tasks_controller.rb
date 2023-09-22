class TasksController < ApplicationController

  before_action :task_authorization, only: [:update, :destroy]
  before_action only: :create do
    list_authorization(task_params[:list_id].to_i)
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

  def task_authorization
    @owned_task = @owned_lists.map { |list| list.tasks }.flatten.find { |task| task.id == task_params[:id].to_i }
    render_non_ownership_message unless @owned_task
  end

  # strong params
  def task_params
    params.permit(:id, :description, :completed, :list_id)
  end

end
