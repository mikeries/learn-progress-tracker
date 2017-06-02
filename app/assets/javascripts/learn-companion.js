$(function() {
    console.log('DOM is ready to go!');
    has = $.get('/lessons/4441.json', function(response) {
        console.log(response)
    })
})