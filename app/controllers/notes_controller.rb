class NotesController < ApplicationController
  before_action :authenticate_student!

  def edit
    @note = current_student.notes.find(params[:id])
  end

  def new
    @note = current_student.notes.build
  end
end
