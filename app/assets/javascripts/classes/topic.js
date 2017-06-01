function Topic() {}

Topic.prototype = Object.create(Track.prototype);
Topic.prototype.constructor = Track;