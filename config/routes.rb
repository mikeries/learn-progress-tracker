Rails.application.routes.draw do
  devise_for :students, :controllers => { :omniauth_callbacks => "students/omniauth_callbacks" }

  root to: "sessions#welcome"

  get '/dashboard' => 'sessions#dashboard'
  get '/search' => 'search#search'

  resources :lessons, only: [:index, :show, :update, :edit] do
    resources :notes, only: [:edit, :new]
  end

  resources :notes, only: [:index, :edit, :update, :new, :create]
  resources :tracks, only: [:index, :create]
end
