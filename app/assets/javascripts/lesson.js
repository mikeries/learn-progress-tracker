function Lesson(attributes) {
    this.tags = []
    for (var key in attributes) {
        if(key=='tags') {
            var tags_array = attributes[key];
            for (var index in tags_array) {
                this.tags.push(new Tag(tags_array[index]));
            }
        } else {
            this[key] = attributes[key];
        }
    }

    this.typeIconName = (this.content_type == 'Lab' ?
        'fa-flask' :
        'fa-book'
    )
    this.statusIconName = (this.complete ?
        'fa-check-circle-o' :
        'fa-circle-o'
    )

    this.previous_lesson_link = (this.previous_lesson_id ?
      `/lessons/${this.previous_lesson_id}` :
      '/lessons'
    )

    this.next_lesson_link = (this.next_lesson_id ?
      `/lessons/${this.next_lesson_id}` :
      '/lessons'
    )

}

Lesson.prototype.sortedTags = function() {
    return this.tags.sort((a, b) => {
        a.category > b.category ? 1 : 0;
    })
}

Lesson.initializeHandlebars = function initializeHandlebars() {
    Lesson.templateSrc = $('#lesson-template').html();
    Lesson.template = Handlebars.compile(Lesson.templateSrc);

    Lesson.tagsPartialSrc = $('#lesson-tags-partial').html();
    Handlebars.registerPartial('tagsPartial', Lesson.tagsPartialSrc);

    Lesson.notesPartialSrc = $('#lesson-notes-partial').html();
    Handlebars.registerPartial('notesPartial', Lesson.notesPartialSrc);
}

Lesson.prototype.displayLesson = function() {
    $('#lesson-content').html(Lesson.template(this));
    window.history.pushState(null, null, `/lessons/${this.id}.html`);
    this.addListeners();
}

Lesson.prototype.addListeners = function() {
    this.pageButtonListener();
    this.notesButtonListener();
}

Lesson.getLesson = function(url) {
  $.ajax({
          url: url,
          dataType: 'json',
          method: 'GET'
      })
      .success((data) => {
          const lesson = new Lesson(data);
          lesson.displayLesson();
      })
      .fail((response) => {
          errorMessage(`Oops! Failed to load '${url}'.`);
      });
}

Lesson.prototype.pageButtonListener = function() {
    $('.page-button').parent().on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');

        if (url == '/lessons') {
            return window.location.href = url;
        }

        Lesson.getLesson(url);
    })
}

Lesson.prototype.notesButtonListener = function() {
    const lesson = this;
    $('.notes-button').parent().on('click', function() {
      if ($('.notes-button').text() == 'Edit') {
        lesson.showForm();
      } else {
        lesson.submitForm();
      }
    })
}

Lesson.prototype.showForm = function() {
  $('#notes-show').css('display','none');
  $form = $('#notes-edit form')
  if (this.notes[0]) {
    $form.attr('method', 'patch')
    $form.attr('action', `/lessons/${this.id}/notes/${this.notes[0].id}`)
    $('#note_content').val(this.notes[0].content)
  }
  $('.notes-button').text('Save');
  $('#notes-edit').css('display','block');
}

Lesson.prototype.submitForm = function() {
    $form = $('#notes-edit form')
    console.log('submitting form')
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      dataType: 'json'
    })
    .success(function(data) {
      console.log('successful')
    })
    .fail(function(data) {
      errorMessage(`Oops! Failed to save: '${data.responseJSON.message}'.`);
    });
}

$(function() {
    if ($('body').hasClass("lessons show")) {
        Lesson.initializeHandlebars();
        Lesson.getLesson($('#lesson-content').data().lessonUrl);
    }
})