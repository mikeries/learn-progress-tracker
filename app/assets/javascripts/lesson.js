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

    // TODO: move these into handlebars helper or partial
    this.typeIconName = (this.content_type == 'Lab' ?
        'fa-flask' :
        'fa-book'
    )
    this.statusIconName = (this.complete ?
        'fa-check-circle-o' :
        'fa-circle-o'
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
    Lesson.editTemplate = Handlebars.compile(Lesson.editTemplateSrc);

    Lesson.lessonEditPartialSrc = $('#lesson-edit-partial').html();
    Handlebars.registerPartial('lessonEditPartial', Lesson.lessonEditPartialSrc);
}

$(function() {
    console.log('initialize lesson')
    if ($('body').hasClass('lessons show')) {
        Lesson.initializeHandlebars();
        Lesson.addListeners();
    }
})

Lesson.prototype.viewHtml = function() {
    return Lesson.template(this);
}

Lesson.prototype.editHtml = function() {
    return Lesson.editTemplate(this);
}

Lesson.addListeners = () => {
    Lesson.pageButtonListener();
    Lesson.tagsButtonListener();
}

Lesson.displayLesson = (data) => {
    lesson = new Lesson(data);
    var html = lesson.viewHtml();
    $('#lesson-content').html(html);
    window.history.pushState(null, null, `/lessons/${lesson.id}.html`);
    Lesson.addListeners();
}

Lesson.editLesson = (data) => {
    lesson = new Lesson(data);
    var html = lesson.editHtml();
    $('#lesson-content').html(html);
    window.history.pushState(null, null, `/lessons/${lesson.id}.html`);
    Lesson.addListeners();
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