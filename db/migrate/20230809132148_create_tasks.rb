class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.text :description, null: false
      t.datetime :due_date
      t.boolean :completed, null: false
      t.belongs_to :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
