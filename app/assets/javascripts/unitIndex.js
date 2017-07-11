Lesson.prototype.lessonIndexTitle = function() {
    return `
    <div>
        <i class="fa ${this.statusIconName}"></i>
        <i class="fa ${this.typeIconName}"></i>
        <a href="/lessons/${this.id}">${this.title}</a>
    </div>`
}

Lesson.lessonIndexHtml = function(lessons) {
    return lessons.reduce((html, attributes) => {
      const lesson = new Lesson(attributes);
      return html += lesson.lessonIndexTitle()}
    , '')
}

Lesson.getLessonIndex = function(ev) {
    unitId = $(ev.currentTarget).data().unitId;
    $lessonIndexContainer = $(`#unit-${unitId}`)

    if ($lessonIndexContainer.children().length === 0) {
        $.ajax({
            url: `/lessons/unit/${unitId}`,
            dataType: 'json',
            method: 'GET'
        })
        .success((data) => {
            $lessonIndexContainer
              .empty()
              .append(Lesson.lessonIndexHtml(data));
        })
        .fail(() => {
            errorMessage(`Oops! Failed to load '${url}'.`);
        });
    }
}

$(function() {
    if ($('body').hasClass("lessons index")) {
        $('.unit a').on('click', Lesson.getLessonIndex)
    }
})