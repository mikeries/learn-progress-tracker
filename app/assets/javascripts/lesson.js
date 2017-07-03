function Lesson(attributes) {
    this.tags = [];
    for (var key in attributes) {
        if(key == 'tags') {
            const tags_array = attributes[key];
            for (var index in tags_array) {
                this.tags.push(new Tag(tags_array[index]));
            }
        } else if(key == 'notes') {
            this.notes = new Note(attributes['notes'][0]);
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

Lesson.prototype.displayLesson = function() {
    $('#lesson-content').html(Lesson.template(this));
    this.addListeners();
}

Lesson.prototype.addListeners = function() {
    this.pageButtonListener();
    this.notesButtonListener();
}

Lesson.prototype.pageButtonListener = function() {
    $('.page-button').parent().on('click', function(e) {
        e.preventDefault();

        const url = $(this).attr('href');
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

    const $form = $('#notes-edit form')
    if (this.notes.content) {
        $form.attr('method', 'patch')
        $form.attr('action', `/lessons/${this.id}/notes/${this.notes.id}`)
        $('#note_content').val(this.notes.content)
    }
    $('.notes-button').text('Save');

    $('#notes-edit').css('display','block');
}

Lesson.prototype.submitForm = function() {
    const lesson = this;
    const $form = $('#notes-edit form');
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        dataType: 'json'
    })
    .success(function(data) {
        lesson.notes = new Note(data);
        lesson.displayLesson();
    })
    .fail(function(data) {
        errorMessage(`Oops! Failed to save: '${data.responseJSON.message}'.`);
    });
}

Lesson.initializeHandlebars = function initializeHandlebars() {
    Lesson.templateSrc = $('#lesson-template').html();
    Lesson.template = Handlebars.compile(Lesson.templateSrc);

    Lesson.tagsPartialSrc = $('#lesson-tags-partial').html();
    Handlebars.registerPartial('tagsPartial', Lesson.tagsPartialSrc);

    Lesson.notesPartialSrc = $('#lesson-notes-partial').html();
    Handlebars.registerPartial('notesPartial', Lesson.notesPartialSrc);
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
        window.history.pushState(null, null, `/lessons/${lesson.id}`);
    })
    .fail((response) => {
        errorMessage(`Oops! Failed to load '${url}'.`);
    });
}

Lesson.prototype.indexTitleHtml = function() {
    const html = 
    `
    <div>
        <i class="fa ${this.statusIconName}"></i>
        <i class="fa ${this.typeIconName}"></i>
        <a href="/lessons/${this.id}">${this.title}</a>
    </div>
    `
    return html
}

Lesson.unitHtml = function(lessons) {
    let html = '';
    for (var index in lessons) {
        var lesson = new Lesson(lessons[index]);
        html += lesson.indexTitleHtml()
    }
    return html
}

$(function() {
    if ($('body').hasClass("lessons show")) {
        Lesson.initializeHandlebars();
        Lesson.getLesson($('#lesson-content').data().lessonUrl);
    }
    if ($('body').hasClass("lessons index")) {
        $('.unit a').on('click', function(e) {
            unitId = $(this).data().unitId;

            $.ajax({
                url: `/lessons/units/${unitId}`,
                dataType: 'json',
                method: 'GET'
            })
            .success((data) => {
                const html = Lesson.unitHtml(data);
                $(`#unit-${unitId}`).empty().append(html);
            })
            .fail((response) => {
                errorMessage(`Oops! Failed to load '${url}'.`);
            });
        })
    }
})