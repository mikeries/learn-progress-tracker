Rails.application.routes.draw do
  devise_for :students, :controllers => { :omniauth_callbacks => "students/omniauth_callbacks" }

  root to: "sessions#welcome"

  get '/dashboard' => 'sessions#dashboard'
  get '/search' => 'search#search'
  get '/students' => 'sessions#welcome'
  get '/students/on_track/:slug' => 'sessions#on_track'

  resources :lessons, only: [:index, :show, :update, :edit] do
    resources :notes, only: [:show, :edit, :new, :create, :update]
  end

  resources :tracks, only: [:index, :create]
end
