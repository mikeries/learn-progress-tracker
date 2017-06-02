function CurriculumElement() {}

function Track() {}

Track.prototype = Object.create(CurriculumElement.prototype);
Track.prototype.constructor = CurriculumElement;

function Topic() {}

Topic.prototype = Object.create(Track.prototype);
Topic.prototype.constructor = Track;

function Unit() {}

Unit.prototype = Object.create(Topic.prototype);
Unit.prototype.constructor = Topic;

function Lesson() {}

Lesson.prototype = Object.create(Unit.prototype);
Lesson.prototype.constructor = Unit;