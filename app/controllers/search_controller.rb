class SearchController < ApplicationController
  before_action :authenticate_student!

  def index
    text = '%' + params[:search] + '%'

    @results = []
    tags = current_student.tags.where("category like ? collate nocase", text)
    tags.each {|tag| @results << tag.lessons.to_a.flatten }

    notes = current_student.notes.where("content like ? collate nocase", text)
    notes.each {|note| @results << note.lesson}

    lessons = current_student.lessons.where("title like ? collate nocase", text)
    @results += lessons.to_a.flatten

  end
end
