class SessionsController < ApplicationController
  def welcome
    return redirect_to dashboard_path if student_signed_in?
  end

  def dashboard
    return redirect_to root_path unless student_signed_in?
    return redirect_to tracks_path if current_student.tracks.empty?
  end

  def on_track
    @track = Track.find_by(slug: params[:slug])
  end
end
