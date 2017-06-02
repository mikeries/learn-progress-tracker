class LessonsController < ApplicationController
  before_action :authenticate_student!

  def index
    @topics = current_track.topics.all
    respond_to do |format| 
      format.html { render :index }
      format.json { render json: @topics }
    end
  end

  def show
    @lesson = current_track.lessons.find(params[:id])
    @note = @lesson.notes.first
    respond_to do |format| 
      format.html { render :show }
      format.json { render json: @lesson }
    end
  end

  def edit
    @lesson = current_track.lessons.find(params[:id])
    @tag = Tag.new
  end

  def update
    @lesson = Lesson.find(params[:id])

    if @lesson.update(lesson_params)
      redirect_to lesson_path @lesson
    else
      @lesson.errors.messages.delete(:tags)
      @tag = @lesson.tags.last
      flash.now[:error] = @lesson.errors.full_messages.join("<br>").html_safe
      render :edit
    end
  end

  private
  def lesson_params
    params.require(:lesson).permit(:tag_ids => [], tags_attributes: [:category])
  end

end
