class AddOmniAuthToStudents < ActiveRecord::Migration[5.1]
  def change
    add_column :students, :provider, :string
    add_index :students, :provider
    add_column :students, :uid, :string
    add_index :students, :uid
  end
end
