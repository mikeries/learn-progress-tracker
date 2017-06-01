function Unit() {}

Unit.prototype = Object.create(Topic.prototype);
Unit.prototype.constructor = Topic;