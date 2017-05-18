class LessonsController < ApplicationController
  before_action :authenticate_student!

  def index
    @topics = current_track.topics.all
  end

  def show
    @lesson = current_track.lessons.find(params[:id])
    @note = @lesson.notes.find_by(student_id: current_student.id)
  end
end
