class CreateCurriculumElements < ActiveRecord::Migration[5.1]
  def change
    create_table :curriculum_elements do |t|
      t.boolean :complete
      t.datetime :started_at
      t.boolean :viewed
      t.string :content_type
      t.string :slug
      t.string :title
      t.boolean :visible
      t.boolean :completed_all
      t.boolean :started_any
      t.integer :student_id
      t.string :type

      t.timestamps
    end
  end
end
