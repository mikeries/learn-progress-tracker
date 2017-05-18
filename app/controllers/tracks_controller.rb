class TracksController < ApplicationController
  before_action :authenticate_student!
  def index
  end

  def create
    initialize_track(params[:track])
    redirect_to dashboard_path
  end

  private

  def initialize_track(selected_track)
    if selected_track == 'Bootcamp Prep'
      file = File.read(Rails.root + 'db/bootcamp-prep.json')
    elsif selected_track == 'Full Stack Web Dev. With React'
      file = File.read(Rails.root + 'db/full-stack-web-dev-with-react.json')
    end
    track_hash = JSON.parse(file)
    current_student.current_track = current_student.tracks.create(track_hash)
    current_student.save
  end

end
