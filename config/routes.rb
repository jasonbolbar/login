Rails.application.routes.draw do
  namespace :api do
    resources :applications, except: [:new, :edit] do
      resources :users
      resources :roles
    end
  end
  use_doorkeeper
  namespace 'api' do
    post 'user_token' => 'user_token#create'
  end
  root 'main#index'
  get '*path', to: 'main#index'
end
