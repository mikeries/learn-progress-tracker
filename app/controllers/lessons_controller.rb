class LessonsController < ApplicationController
  def index
    @topics = Topic.all
  end

  def show
    @lesson = Lesson.find(params[:id])
  end
end
