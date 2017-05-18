class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_track


  def current_track
    @current_track ||= current_student.current_track
  end
end
