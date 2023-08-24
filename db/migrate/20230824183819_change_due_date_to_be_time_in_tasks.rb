class ChangeDueDateToBeTimeInTasks < ActiveRecord::Migration[7.0]
  def change
    change_column :tasks, :due_date, :time
  end
end
