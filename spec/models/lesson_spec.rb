require 'rails_helper'

RSpec.describe Lesson, :type => :model do

  describe 'navigation' do
    it 'knows the lesson url' do
      expect(Lesson.first.url).to eq('https://learn.co/tracks/full-stack-web-dev-with-react/intro-to-ruby-development/intro-to-programming/intro-to-tic-tac-toe')
    end
  end

  describe 'status' do
    it 'responds with Completed when the lesson has been completed' do
      expect(Lesson.first.status).to eq('Completed')
    end
  end

end
