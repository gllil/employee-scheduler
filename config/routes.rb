Rails.application.routes.draw do
  root 'pages#index'
  get 'scheduler', to: 'pages#index'
  get 'employees', to: 'pages#index'
 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :workdays
  resources :users
end
