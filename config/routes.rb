Rails.application.routes.draw do
  devise_for :students, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  root to: "session#welcome"
end
