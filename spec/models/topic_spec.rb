require 'rails_helper'

RSpec.describe Topic, :type => :model do
  before(:each) do
    binding.pry
  end

  describe 'items' do
    it 'has many line_items built through instance method' do
      expect(@cart.line_items).to include(@line_item)
    end

    it 'has many items through line_items' do
      expect(@cart.items).to include(@item)
    end
  end

end
