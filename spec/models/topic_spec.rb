require 'rails_helper'

RSpec.describe Topic, :type => :model do

  describe 'progress' do
    it 'can count how many lessons have been completed' do
      expect(Topic.first.completed_lessons).to eq(60)
    end
  end

end
