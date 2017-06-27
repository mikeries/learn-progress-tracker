Lesson.initializeHandlebars = function initializeHandlebars() {
console.log('initializing handlebars')
    Lesson.templateSrc = $('#lesson-template').html();
    Lesson.template = Handlebars.compile(Lesson.templateSrc);

    Lesson.tagsPartialSrc = $('#lesson-tags-partial').html();
    Handlebars.registerPartial('tagsPartial', Lesson.tagsPartialSrc);

    Lesson.notesPartialSrc = $('#lesson-notes-partial').html();
    Handlebars.registerPartial('notesPartial', Lesson.notesPartialSrc);

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
    if ($('body').hasClass('lessons show')) {
        Lesson.initializeHandlebars();
        Lesson.addListeners();
    }
})

Lesson.addListeners = () => {
    Lesson.pageButtonListener();
    Lesson.tagsButtonListener();
}

Lesson.displayLesson = (data) => {
    lesson = new Lesson(data);
    var html = lesson.viewHtml();
    $('#lesson-content').html(html);
    window.history.pushState(null, null, `/lessons/${lesson.id}.html`);
    Lesson.initializeHandlebars();
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