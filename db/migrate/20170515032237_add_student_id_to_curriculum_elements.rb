class AddStudentIdToCurriculumElements < ActiveRecord::Migration[5.1]
  def change
    add_column :curriculum_elements, :student_id, :integer
  end
end
