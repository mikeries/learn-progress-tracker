class AddCurrentTrackIdToStudents < ActiveRecord::Migration[5.1]
  def change
    add_column :students, :current_track_id, :integer
  end
end
