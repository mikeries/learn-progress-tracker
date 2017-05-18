class LessonsController < ApplicationController
  before_action :authenticate_student!

  def index
    @topics = current_student.topics.all
  end

  def show
    @lesson = Lesson.find(params[:id])
    @note = @lesson.notes.find_by(student_id: current_student.id)
  end
end
