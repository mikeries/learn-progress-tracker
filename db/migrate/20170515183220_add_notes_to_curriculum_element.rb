class AddNotesToCurriculumElement < ActiveRecord::Migration[5.1]
  def change
    add_column :curriculum_elements, :notes, :text
  end
end
