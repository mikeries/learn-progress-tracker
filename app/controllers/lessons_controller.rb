class LessonsController < ApplicationController
  before_action :authenticate_student!

  def index
    @topics = Topic.all
  end

  def show
    @lesson = Lesson.find(params[:id])
    @student_lesson = @lesson.student_lessons.find_by(student_id: current_student.id)
  end
end
