class CreateWorkdays < ActiveRecord::Migration[6.1]
  def change
    create_table :workdays do |t|
      t.date :date
      t.integer :start_hour
      t.integer :start_min
      t.string :start_am_or_pm
      t.integer :end_hour
      t.integer :end_min
      t.string :end_am_or_pm
      t.integer :user_id

      t.timestamps
    end
  end
end
