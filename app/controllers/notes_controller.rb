class NotesController < ApplicationController
  before_action :authenticate_student!

  def edit
    @note = current_student.notes.find(params[:id])
  end

  def new
    @note = current_student.notes.build
  end

  def create
    @note = current_student.notes.build(note_params)
    byebug
    if @note.save
      redirect_to lesson_path(note.lesson)
    else
      :edit
    end
  end

  private

  def note_params
    params.require(:note).permit(:content)
  end
end
