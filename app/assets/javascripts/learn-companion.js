'use strict';

$(function() {
    console.log('DOM is ready to go!');
})

function errorMessage(message) {
    console.log(message);
}

function loadLesson(lesson_id) {
    $.get(`/lessons/${lesson_id}.json`, function(response) {
        var lesson = new Lesson();
        $.extend(lesson, response);
        return lesson;
    }).fail(function(error) {
        errorMessage(error);
    });
}