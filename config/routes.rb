Rails.application.routes.draw do
  devise_for :students

  root_to "session#welcome"
end
