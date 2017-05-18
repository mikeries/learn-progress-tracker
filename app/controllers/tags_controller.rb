class TagsController < ApplicationController
  def create
    @lesson = current_student.lessons.find(id: params[:tag][:lesson_id])
    @tag = @lesson.tags.build(tag_params)
    if @tag.save
      redirect_to lesson_path(@lesson)
    else
      :edit
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:category, :lesson_id)
  end
end
