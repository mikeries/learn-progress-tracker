require 'rails_helper'

RSpec.describe Unit, :type => :model do

  describe 'progress' do
    it 'can count how many lessons have been completed' do
      expect(Unit.first.completed_lessons).to eq(5)
    end
  end

end
