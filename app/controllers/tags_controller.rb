class TagsController < ApplicationController
  def create
    @tag = current_student.lessons.tags.build(tag_params)
    if @tag.save
      redirect_to lesson_path(@tag.lesson)
    else
      :edit
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:category)
  end
end
