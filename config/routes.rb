Rails.application.routes.draw do

  # DEV ROUTES:
  # get '/hello', to: 'application#hello_world'
  # resources :user_lists
  # resources :tasks
  # resources :lists
  resources :users, only: [:index]
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # session routes:
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # user routes
  get '/me', to: 'users#show' # if user has a session, return user object (auto login)
  resources :users, only: [:create]  
end
