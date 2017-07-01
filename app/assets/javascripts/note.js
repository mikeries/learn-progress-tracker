function Note(attributes) {
  for (var key in attributes) {
    this[key] = attributes[key];
  }
}