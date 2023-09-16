class RemoveParticipantFromUserLists < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_lists, :participant
  end
end
