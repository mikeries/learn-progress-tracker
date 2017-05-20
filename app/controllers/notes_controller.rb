class NotesController < ApplicationController
  before_action :authenticate_student!

  def index
    @lesson = Lesson.find(session[:current_lesson]) unless session[:lesson_id].nil?
    if @lesson
      redirect_to lesson_path(@lesson)
    else
      redirect_to lessons_path
    end
  end

  def edit
    @note = current_student.notes.find(params[:id])
  end

  def new
    @note = current_student.notes.build
    @note.student = current_student

    @note.lesson = Lesson.find(params[:lesson_id])
  end

  def create
    @note = current_student.notes.build(note_params)
    if @note.save
      redirect_to lesson_path(@note.lesson)
    else
      flash[:error] = @note.errors.full_messages.join("")
      session[:current_lesson] = @note.lesson.id
      render :new
    end
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_params)
    if @note.valid?
      redirect_to lesson_path(@note.lesson)
    else
      flash[:error] = @note.errors.full_messages.join("")
      render :edit
    end
  end

  private

  def note_params
    params.require(:note).permit(:content, :student_id, :lesson_id)
  end
end
