function Tag(attributes) {
  for (let key in attributes) {
    this[key] = attributes[key];
  }
}