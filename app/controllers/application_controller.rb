class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def breadcrumb_menu(track, unit, lesson)
    result = link_to("Full Stack Web Dev. With React", lessons_path)

    unless unit.nil? || unit.title.empty?
      result += " | " + link_to("unit.title", lessons_path+"#")
    end
  end
end
