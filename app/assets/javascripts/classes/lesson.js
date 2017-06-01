function Lesson() {}

Lesson.prototype = Object.create(Unit.prototype);
Lesson.prototype.constructor = Unit;