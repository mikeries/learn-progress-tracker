class LessonsController < ApplicationController
  before_action :authenticate_student!

  def index
    @topics = current_track.topics.all
  end

  def show
    @lesson = current_track.lessons.find(params[:id])
    @note = @lesson.notes.find_by(student_id: current_student.id)
  end

  def edit
    @lesson = current_track.lessons.find(params[:id])
    @note = @lesson.notes.find_by(student_id: current_student.id)
  end

  def update
    @lesson = Lesson.find(params[:id])
    if @lesson.update(lesson_params)
      redirect_to lesson_path @lesson
    else
      @note = @lesson.notes.find_by(student_id: current_student.id)
      render :show
    end
  end

  private
  def lesson_params
    params.require(:lesson).permit(:tag_ids => [], tags_attributes: [:category])
  end
end
