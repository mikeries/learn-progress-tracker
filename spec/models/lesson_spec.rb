require 'rails_helper'

RSpec.describe Lesson, :type => :model do

  describe 'progress' do
    it 'knows the lesson url' do
      expect(Lesson.first.url).to eq('https://learn.co/tracks/full-stack-web-dev-with-react/intro-to-ruby-development/intro-to-programming/intro-to-tic-tac-toe')
    end
  end

end
