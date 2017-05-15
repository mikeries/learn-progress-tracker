class SessionsController < ApplicationController
  def welcome
    return redirect_to dashboard_path if student_signed_in?
  end

  def dashboard
    return redirect_to root_path unless student_signed_in?
  end

end
