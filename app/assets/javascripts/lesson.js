function Lesson(attributes) {
    this.tags = []
    for (var key in attributes) {
        if(key=='tags') {
            var tags_array = attributes[key];
            for (var index in tags_array) {
                this.tags.push(new Tag(tags_array[index]));
            }
        } else {
            this[key] = attributes[key];
        }
    }

    this.typeIconName = (this.content_type == 'Lab' ?
        'fa-flask' :
        'fa-book'
    )
    this.statusIconName = (this.complete ?
        'fa-check-circle-o' :
        'fa-circle-o'
    )
}

Lesson.prototype.sortedTags = function() {
    return this.tags.sort((a, b) => {
        a.category > b.category ? 1 : 0;
    })
}