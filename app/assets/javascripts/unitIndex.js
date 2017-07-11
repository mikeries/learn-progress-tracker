Lesson.prototype.indexTitleHtml = function() {
    return `
    <div>
        <i class="fa ${this.statusIconName}"></i>
        <i class="fa ${this.typeIconName}"></i>
        <a href="/lessons/${this.id}">${this.title}</a>
    </div>`
}

Lesson.unitHtml = function(lessons) {
    return lessons.reduce((html, props) => {
      const lesson = new Lesson(props);
      return html += lesson.indexTitleHtml()}
    , '')
    // let html = '';
    // for (let index in lessons) {
    //     const lesson = new Lesson(lessons[index]);
    //     html += lesson.indexTitleHtml()
    // }
    // return html
}

Lesson.getUnitIndex = function(ev) {
    unitId = $(ev.currentTarget).data().unitId;
    $unitIndexContainer = $(`#unit-${unitId}`)

    if ($unitIndexContainer.children().length === 0) {
        $.ajax({
            url: `/lessons/units/${unitId}`,
            dataType: 'json',
            method: 'GET'
        })
        .success((data) => {
          console.log(data);
            const html = Lesson.unitHtml(data);
            $unitIndexContainer.empty().append(html);
        })
        .fail(() => {
            errorMessage(`Oops! Failed to load '${url}'.`);
        });
    }
}

$(function() {
    if ($('body').hasClass("lessons index")) {
        $('.unit a').on('click', Lesson.getUnitIndex)
    }
})