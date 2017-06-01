function Track() {}

Track.prototype = Object.create(CurriculumElement.prototype);
Track.prototype.constructor = CurriculumElement;