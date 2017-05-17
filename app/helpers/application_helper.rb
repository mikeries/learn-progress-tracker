module ApplicationHelper

  def breadcrumb_menu(element)
    links = ["Full Stack Web Dev. With React"]

    case element.type
    when 'Topic'
      links << element.title
    when 'Unit'
      links << element.topic.title
      links << element.title
    when 'Lesson'
      links << element.unit.topic.title
      links << element.unit.title
      links << element.title
    end

    links.join(" > ")
  end

end
