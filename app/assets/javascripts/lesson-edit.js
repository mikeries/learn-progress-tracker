Lesson.initializeHandlebars = function initializeHandlebars() {
    Handlebars.registerHelper('previous_lesson_link', function() {
        if (this.previous_lesson_id) {
            return new Handlebars.SafeString("/lessons/" +
                this.previous_lesson_id);
        } else {
            return '/lessons';
        }
    });

    Handlebars.registerHelper('next_lesson_link', function() {
        if (this.next_lesson_id) {
            return new Handlebars.SafeString("/lessons/" +
                this.next_lesson_id);
        } else {
            return '/lessons';
        }
    });

    Lesson.editTemplateSrc = $('#lesson-edit-template').html();
    Lesson.template = Handlebars.compile(Lesson.editTemplateSrc);

    Lesson.lessonEditPartialSrc = $('#lesson-edit-partial').html();
    Handlebars.registerPartial('lessonEditPartial', Lesson.lessonEditPartialSrc);
}

$(function() {
    if ($('body').hasClass('lessons edit')) {
        Lesson.initializeHandlebars();
        Lesson.addListeners();
    }
})

Lesson.prototype.editHtml = function() {
    return Lesson.template(this);
}

Lesson.addListeners = () => {
    console.log('adding listeners')
}

Lesson.editLesson = (data) => {
    lesson = new Lesson(data);
    var html = lesson.editHtml();
    $('#lesson-content').html(html);
    window.history.pushState(null, null, `/lessons/${lesson.id}.html`);
    Lesson.initializeHandlebars();
    Lesson.addListeners();
}
