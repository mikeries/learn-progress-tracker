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

  def type_icon_for(lesson, options=[])
    options += ['fa']
    options += lesson.content_type == 'Lab' ? ['fa-flask'] : ['fa-book']

    content_tag :i, nil, class: options
  end

  def status_icon_for(lesson, options=[])
    options += ['fa']
    options += lesson.complete ? ['fa-check-circle-o'] : ['fa-circle-o']

    content_tag :i, nil, class: options
  end

  def nav_button_for(button_type, path = lessons_path)

    case button_type
    when 'Index'
      path = lessons_path
    when 'Next'
      path = lesson_path(@lesson.next_lesson_id) unless @lesson.next_lesson_id.nil?
      klass = 'page-button'
    when 'Previous'
      path = lesson_path(@lesson.previous_lesson_id) unless @lesson.previous_lesson_id.nil?
      klass = 'page-button'
    when 'Tags'
      path = edit_lesson_path(@lesson)
    when 'Notes'
      path = @note ? edit_lesson_note_path(@lesson, @note) : new_lesson_note_path(@lesson)
    end

    link_to "<button type='button' class='btn btn-default #{klass}'>#{button_type}</button>".html_safe, path
  end

end
