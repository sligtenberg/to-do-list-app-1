Rails.application.routes.draw do

  # DEV ROUTES:
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

  # task routes
  resources :tasks, only: [:create, :update, :destroy]
end
