class UsersController < ApplicationController

  # don't need to be logged in to create a user
  skip_before_action :authorize, only: [:create]

  # create a new user and make a session for them
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, include: ['user_lists.list.tasks', 'user_lists.list.user_lists.user'], status: :created
  end

  # automatically log in if the user has a session
  def show
    render json: @current_user, include: ['user_lists.list.tasks', 'user_lists.list.user_lists.user']
  end

  private

  # strong params
  def user_params
    params.permit(:username, :password)
  end
  
end
