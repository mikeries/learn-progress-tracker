function CurriculumElement() {}

function Track(attributes) {
    this.topics = []
    for (var key in attributes) {
        this.topics.push(new Topic(attributes[key]));
    }
}

Track.prototype = Object.create(CurriculumElement.prototype);
Track.prototype.constructor = CurriculumElement;

function Topic(attributes) {
    this.units = []
    for (var key in attributes) {
        if (key == 'units') {
            this.units.push(new Unit(attributes[key]));
        } else {
            this[key] = attributes[key];
        }
    }
}

Topic.prototype = Object.create(Track.prototype);
Topic.prototype.constructor = Track;

function Unit(attributes) {
    this.lessons = [];
    for (var key in attributes) {
        if (key == 'lessons') {
            this.lessons.push(new Lesson(attributes[key]));
        } else {
            this[key] = attributes[key];
        }
    }
}

Unit.prototype = Object.create(Topic.prototype);
Unit.prototype.constructor = Topic;

function Lesson(attributes) {
    for (var key in attributes) {
        this[key] = attributes[key]
    }
}

Lesson.prototype = Object.create(Unit.prototype);
Lesson.prototype.constructor = Unit;