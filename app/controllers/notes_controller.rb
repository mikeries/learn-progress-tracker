class NotesController < ApplicationController
  before_action :authenticate_student!

  def create
    @note = current_student.notes.build(note_params)
    @note.student.id=current_student.id

    if @note.content.empty?
      render json: @note, status: 200
    elsif @note.save
      render json: @note, status: 200
    else
      flash.now[:error] = @note.errors.full_messages.join('<br>').html_safe
      render json: { message: flash.now[:error] }, status: 400
    end
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_params)

    if @note.content.empty?
      Note.destroy(@note.id)
      render json: { message: 'note deleted' }, status: 200
    elsif @note.valid?
      render json: @note
    else
      flash.now[:error] = @note.errors.full_messages.join('<br>').html_safe
      render json: { message: flash.now[:error] }, status: 400
    end
  end

  private

  def note_params
    params.require(:note).permit(:content, :lesson_id)
  end
end
