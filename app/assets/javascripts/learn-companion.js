'use strict';

$(function() {
    console.log('DOM is ready to go!');
    $('#next-button').parent().on('click', function(e) {
        e.preventDefault();

        var $link = $(this);
        var url = $link.attr('href');

        // load next page
        $.ajax({
                url: url,
                dataType: 'json',
                method: 'GET'
            })
            .success(function(data) {
                lesson = new Lesson(data);
                var source = $('#lesson-template').html();
                var template = Handlebars.compile(source);
                var html = template(lesson);
                $('#lesson-content').html(html);
            })
            .error(function(response) {
                errorMessage("Oops" + response);
            });

    })
})

function errorMessage(message) {
    console.log(message);
}