class ApplicationController < ActionController::API

  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    @owned_lists = @current_user.user_lists.select { |user_list| user_list.owner }.map { |user_list| user_list.list }
    render json: { errors: ["Log in or sign up to vend!"] }, status: :unauthorized unless @current_user
  end

  def find_owned_list(list_id)
    @owned_lists.find { |list| list.id == list_id }
  end

  def render_non_ownership_message
    render json: { errors: 'You are not an owner of this list' }, status: :unauthorized
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
  
end
