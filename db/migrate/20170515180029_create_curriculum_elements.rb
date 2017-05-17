class CreateCurriculumElements < ActiveRecord::Migration[5.1]
  def change
    create_table :curriculum_elements do |t|
      t.boolean :complete
      t.boolean :viewed
      t.string :content_type
      t.string :slug
      t.string :title
      t.boolean :completed_all
      t.boolean :started_any
      t.string :type

      t.timestamps
    end
  end
end
