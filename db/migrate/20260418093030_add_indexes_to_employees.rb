class AddIndexesToEmployees < ActiveRecord::Migration[8.0]
  def change
    add_index :employees, :country
    add_index :employees, [:country, :job_title]
  end
end
