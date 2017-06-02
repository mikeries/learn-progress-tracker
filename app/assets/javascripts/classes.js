function CurriculumElement() {}

function Track(topic_array) {
    this.topics = []
    for (var key in topic_array) {
        var topic = new Topic(topic_array[key])
        topic.track = this;
        this.topics.push(topic);
    }
}

Track.prototype = Object.create(CurriculumElement.prototype);
Track.prototype.constructor = CurriculumElement;

function Topic(attributes) {
    this.units = []
    for (var key in attributes) {
        if (key == 'units') {
            var unit_array = attributes[key];
            for (var index in unit_array) {
                var unit = new Unit(unit_array[index])
                unit.topic = this;
                this.units.push(unit);
            }
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
            var lesson_array = attributes[key];
            for (var index in lesson_array) {
                var lesson = new Lesson(lesson_array[index])
                lesson.unit = this;
                this.lessons.push(lesson);
            }
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