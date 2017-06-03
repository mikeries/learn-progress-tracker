function Lesson(attributes) {
    for (var key in attributes) {
        this[key] = attributes[key]
    }
}

Lesson.prototype = Object.create(Unit.prototype);
Lesson.prototype.constructor = Unit;