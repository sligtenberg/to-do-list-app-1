class TasksController < ApplicationController

  def create
    list = find_owned_list(task_params[:list_id].to_i)
    if list
      task = list.tasks.create!(task_params)
      render json: task, status: :created
    else
      render_non_ownership_message
    end
  end

  def update
    task = find_owned_task
    if task
      task.update!(task_params)
      render json: task
    else
      render_non_ownership_message
    end
  end

  def destroy
    task = find_owned_task
    if task
      task.destroy
    else
      render_non_ownership_message
    end
  end

  private

  def find_owned_task
    @owned_lists.map { |list| list.tasks }.flatten.find { |task| task.id == task_params[:id].to_i }
  end

  # strong params
  def task_params
    params.permit(:id, :description, :completed, :list_id)
  end

end
