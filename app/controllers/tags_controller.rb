class TagsController < ApplicationController
  before_action :authenticate_student!

  def create
    @lesson = current_student.lessons.find(params[:tag][:lesson_id])
    @lesson_tag = @lesson.lesson_tags.build(tag: Tag.new(tag_params))

    if @lesson_tag.save
      redirect_to lesson_path(@lesson)
    else
      :edit
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:category)
  end
end
