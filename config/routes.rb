Rails.application.routes.draw do
  devise_for :students, :controllers => { :omniauth_callbacks => "students/omniauth_callbacks" }

  root to: "sessions#welcome"

  get '/dashboard' => 'sessions#dashboard'
  get '/search' => 'search#search'
  get '/students' => 'sessions#welcome'
  get '/students/on_track/:slug' => 'sessions#on_track'
  get '/lessons/unit/:id' => 'lessons#unit'

  resources :lessons, only: [:index, :show, :update, :edit] do
    resources :notes, only: [ :create, :update]
  end

  resources :tracks, only: [:index, :create]
end
