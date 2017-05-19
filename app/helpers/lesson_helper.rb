module LessonHelper
  def collapse_id(element)
      "collapse_topic_#{element.id}"
  end

  def href_for(element)
    'href=#' + collapse_id(element)
  end

  def collapse_id_for(element)
    'id=' + collapse_id(element)
  end

  def accordion_id_for(element)
    "id=accordion_topic_#{element.id}" if element.type=='Topic'
  end

  def data_parent_for(element)
    "data-parent=#accordion_topic_#{element.topic.id}" if element.type=='Unit'
  end

  def element_path(element)
    lessons_path + '#' + collapse_id(element)
  end

end
