'use strict';

$(function() {
    console.log('DOM is ready to go!');
})

function errorMessage(message) {
    console.log(message);
}

function loadLesson(lesson_id) {
    $.get(`/lessons/${lesson_id}.json`, data => {
        var lesson = new Lesson();
        $.extend(lesson, data);
        return lesson;
    }).fail(function(error) {
        errorMessage(error);
    });
}