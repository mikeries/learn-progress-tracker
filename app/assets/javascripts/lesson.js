function Lesson(attributes) {
    for (var key in attributes) {
        this[key] = attributes[key];
    }

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

    Lesson.addListeners();
})

Lesson.prototype.viewHtml = function() {
    return Lesson.template(this);
}

Lesson.addListeners = function() {
    Lesson.pageButtonListener()
}

Lesson.displayLesson = function(data) {
    var lesson = new Lesson(data);
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