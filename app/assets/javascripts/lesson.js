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

Lesson.prototype.viewHtml = function() {
    return Lesson.template(this);
}

Lesson.prototype.displayLesson = function() {
    $('#lesson-content').html(this.viewHtml());
    window.history.pushState(null, null, `/lessons/${this.id}.html`);
    this.addListeners();
}

Lesson.prototype.addListeners = function() {
    this.pageButtonListener();
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
      .error((response) => {
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

$(function() {
    if ($('body').hasClass("lessons show")) {
        Lesson.initializeHandlebars();
        Lesson.getLesson($('#lesson-content').data().lessonUrl);
    }
})