class SearchController < ApplicationController
  before_action :authenticate_student!

  def search
    @search_term = params[:search]
    text = '%' + params[:search] + '%'

    @lessons = []
    tags = current_student.tags.where("category like ? collate nocase", text)
    tags.each {|tag| @lessons << tag.lessons.to_a.flatten }
    @lessons = @lessons.flatten

    notes = current_student.notes.where("content like ? collate nocase", text)
    notes.each {|note| @lessons << note.lesson}

    lessons = current_student.lessons.where("title like ? collate nocase", text)
    @lessons += lessons.to_a.flatten unless lessons.empty?

    @lessons = @lessons.uniq
  end
end
