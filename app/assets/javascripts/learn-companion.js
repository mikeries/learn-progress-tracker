'use strict';

var curriculum;
var lesson;

$(function() {
    console.log('DOM is ready to go!');
    $('#next-button').parent().on('click', function(e) {
        e.preventDefault();
        // load next page
        console.log('next');
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