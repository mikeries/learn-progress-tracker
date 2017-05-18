# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json'

file = File.read(Rails.root + 'db/curriculum-data.json')
track_hash = JSON.parse(file)

initializer = Student.create(email: 'initialize@student.edu', password: 'initialize')
initializer.tracks.create(track_hash)
