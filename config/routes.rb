Rails.application.routes.draw do
  devise_for :students

  root to: "session#welcome"
end
