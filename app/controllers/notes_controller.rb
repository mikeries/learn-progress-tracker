class NotesController < ApplicationController
  before_action :authenticate_student!

  def edit
    @student_lesson = current_student.student_lessons.find(params[:id])
  end

  def new
    @student_lesson = current_student.student_lessons.build
  end
end
