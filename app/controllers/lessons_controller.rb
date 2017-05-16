class LessonsController < ApplicationController
  def index
    @topics = Topic.all
  end
end
