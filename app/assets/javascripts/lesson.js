function Lesson(attributes) {
    for (var key in attributes) {
        this[key] = attributes[key];
    }
    // TODO: move these into handlebars helper or partial
    this.typeIconName = (this.content_type == 'Lab' ?
        'fa-flask' :
        'fa-book')
    this.statusIconName = (this.complete ?
        'fa-check-circle-o' :
        'fa-circle-o')
}

$(function() {
    Lesson.templateSrc = $('#lesson-template').html();
    Lesson.template = Handlebars.compile(Lesson.templateSrc);

    Lesson.tagsPartialSrc = $('#lesson-tags-partial').html();
    Handlebars.registerPartial('tagsPartial', Lesson.tagsPartialSrc);

    Lesson.addListeners();
})

Lesson.prototype.viewHtml = function() {
    return Lesson.template(this);
}

Lesson.addListeners = function() {
    Lesson.pageButtonListener()
}
var lesson; //make global to facilitate debugging, for now.
Lesson.displayLesson = function(data) {
    lesson = new Lesson(data);
    var html = lesson.viewHtml();
    $('#lesson-content').html(html);
    Lesson.addListeners();
}

Lesson.pageButtonListener = function() {
    $('.page-button').parent().on('click', function(e) {
        e.preventDefault();

        var $link = $(this);
        var url = $link.attr('href');

        $.ajax({
                url: url,
                dataType: 'json',
                method: 'GET'
            })
            .success(Lesson.displayLesson)
            .error(function(response) {
                errorMessage("Oops" + response);
            });

    })
}