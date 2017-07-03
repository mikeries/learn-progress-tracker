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

  def new
    @note = current_student.notes.build
    @note.lesson = Lesson.find(params[:lesson_id])
  end

  def create
    @note = current_student.notes.build(note_params)
    if @note.content.empty?
      render json: @note, status: 200
    elsif @note.save
      render json: @note, status: 200
    else
      flash.now[:error] = @note.errors.full_messages.join('<br>').html_safe
      render json: { message: flash.now[:error] }, status: 400
    end
  end

  def edit
    @note = current_student.notes.find(params[:id])
  end

  def update
    @note = Note.find(params[:id])

    @note.update(note_params)

    if @note.content.empty?
      Note.destroy(@note.id)
    elsif @note.valid?
      render json: @note
    else
      flash.now[:error] = @note.errors.full_messages.join('<br>').html_safe
      render json: { message: flash.now[:error] }, status: 400
    end
  end

  private

  def note_params
    params.require(:note).permit(:content, :student_id, :lesson_id)
  end
end
