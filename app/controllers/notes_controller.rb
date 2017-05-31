class NotesController < ApplicationController
  before_action :authenticate_student!

  def show
    return redirect_to lessons_path if params[:lesson_id].nil?

    @lesson = Lesson.find(params[:lesson_id])
    if @lesson
      redirect_to edit_lesson_note_path(@lesson, params[:id])
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
      flash.now[:error] = @note.errors.full_messages.join("<br>").html_safe
      render :new
    end
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_params)
    if @note.valid?
      redirect_to lesson_path(@note.lesson)
    else
      flash.now[:error] = @note.errors.full_messages.join("<br>").html_safe
      render :edit
    end
  end

  private

  def note_params
    params.require(:note).permit(:content, :student_id, :lesson_id)
  end

end
