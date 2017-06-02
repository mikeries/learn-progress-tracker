'use strict';

$(function() {
    console.log('DOM is ready to go!');
    loadCurriculum();
})

function errorMessage(message) {
    console.log(message);
}

function loadLesson(lesson_id) {
    $.get(`/lessons/${lesson_id}.json`, data => {
        return lesson = new Lesson(data);
    }).fail(function(error) {
        errorMessage(error);
    });
}

function loadCurriculum() {
    $.get(`/lessons.json`, data => {
        console.log(data)
    }).fail(function(error) {
        errorMessage(error);
    });
}