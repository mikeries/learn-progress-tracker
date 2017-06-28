Lesson.initializeHandlebars = function initializeHandlebars() {
console.log('initializing handlebars')
    Lesson.templateSrc = $('#lesson-template').html();
    Lesson.template = Handlebars.compile(Lesson.templateSrc);

    Lesson.tagsPartialSrc = $('#lesson-tags-partial').html();
    Handlebars.registerPartial('tagsPartial', Lesson.tagsPartialSrc);

    Lesson.notesPartialSrc = $('#lesson-notes-partial').html();
    Handlebars.registerPartial('notesPartial', Lesson.notesPartialSrc);

    Lesson.editTemplateSrc = $('#lesson-edit-template').html();
    Lesson.editTemplate = Handlebars.compile(Lesson.editTemplateSrc);

    Lesson.lessonEditPartialSrc = $('#lesson-edit-partial').html();
    Handlebars.registerPartial('lessonEditPartial', Lesson.lessonEditPartialSrc);

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
}

$(function() {
    Lesson.initializeHandlebars();
    Lesson.addListeners();
})

Lesson.addListeners = () => {
    Lesson.pageButtonListener();
    Lesson.tagsButtonListener();
}

Lesson.displayLesson = (data) => {
    lesson = new Lesson(data);
    debugger
    var html = lesson.viewHtml();
    $('#lesson-content').html(html);
    window.history.pushState(null, null, `/lessons/${lesson.id}.html`);
    Lesson.addListeners();
}

Lesson.prototype.viewHtml = function() {
    return Lesson.template(this);
}

Lesson.pageButtonListener = function() {
    $('.page-button').parent().on('click', function(e) {
        e.preventDefault();
        var $link = $(this);
        var url = $link.attr('href');

        if (url == '/lessons') {
            return window.location.href = url;
        }

        $.ajax({
                url: url,
                dataType: 'json',
                method: 'GET'
            })
            .success(Lesson.displayLesson)
            .error((response) => {
                errorMessage(`Oops! Failed to load '${url}'.`);
            });

    })
}

Lesson.tagsButtonListener = function() {
    $('.tags-button').parent().on('click', function(e) {
        console.log('tags button clicked')
        e.preventDefault();
        var $link = $(this);
        var url = $link.attr('href');

        $.ajax({
                url: url,
                dataType: 'json',
                method: 'GET'
            })
            .success(Lesson.editLesson)
            .error((response) => {
                errorMessage(`Oops! Failed to load '${url}'.`);
            });

    })
}

Lesson.editLesson = (data) => {
    lesson = new Lesson(data);
    var html = lesson.editHtml();
    $('#lesson-content').html(html);
    window.history.pushState(null, null, `/lessons/${lesson.id}.html`);
    Lesson.addListeners();
}

Lesson.prototype.editHtml = function() {
    return Lesson.editTemplate(this);
}