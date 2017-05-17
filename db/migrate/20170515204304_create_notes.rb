class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.integer :student_id
      t.text :content
      t.integer :lesson_id

      t.timestamps
    end
  end
end
