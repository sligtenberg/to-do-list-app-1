class TasksController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_inventory_response

  def create
    task = find_list.tasks.create!(task_params)
    render json: task, status: :created
  end

  def update
    task = find_task
    #debugger
    task.update!(task_params)
    render json: task
  end

  def destroy
    find_task.delete
  end

  private

  # probably this is where the checks for owner, participant, read only should take place
  # multiple find methods
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

  def render_unprocessable_inventory_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
