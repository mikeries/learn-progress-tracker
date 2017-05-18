Rails.application.routes.draw do
  devise_for :students, :controllers => { :omniauth_callbacks => "students/omniauth_callbacks" }

  root to: "sessions#welcome"

  get '/dashboard' => 'sessions#dashboard'

  resources :lessons, only: [:index, :show] do
    resources :notes, only: [:edit, :new]
  end

  resources :notes, only: [:edit, :update, :new, :create]
  resources :tracks, only: [:index]
end
