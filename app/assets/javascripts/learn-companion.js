'use strict';

var curriculum;
var lesson;

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
                console.log(data);
            })
            .error(function(response) {
                errorMessage("Oops" + response);
            })
    })
})

function errorMessage(message) {
    console.log(message);
}

function loadLesson(lesson_id) {
    $.get(`/lessons/${lesson_id}.json`, data => {
        lesson = new Lesson(data);
    }).fail(function(error) {
        errorMessage(error);
    });
}

function loadCurriculum() {
    $.get(`/lessons.json`, data => {
        curriculum = new Track(data);
    }).fail(function(error) {
        errorMessage(error);
    });
}