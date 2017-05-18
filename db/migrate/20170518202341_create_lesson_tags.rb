class CreateLessonTags < ActiveRecord::Migration[5.1]
  def change
    create_table :lesson_tags do |t|
      t.integer :tag_id
      t.integer :lesson_id

      t.timestamps
    end
  end
end
