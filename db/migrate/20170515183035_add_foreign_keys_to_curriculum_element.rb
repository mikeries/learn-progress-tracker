class AddForeignKeysToCurriculumElement < ActiveRecord::Migration[5.1]
  def change
    add_column :curriculum_elements, :unit_id, :integer
    add_column :curriculum_elements, :topic_id, :integer
  end
end
