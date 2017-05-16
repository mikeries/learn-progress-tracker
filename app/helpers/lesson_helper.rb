module LessonHelper
  def collapse_id(element)
      "collapse_topic_#{element.id}"
  end

  def href_for(element)
    'href=#' + collapse_id(element)
  end

  def id_for(element)
    'id=' + collapse_id(element)
  end

end
