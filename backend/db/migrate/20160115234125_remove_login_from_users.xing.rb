# This migration comes from xing (originally 20140929192921)
class RemoveLoginFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :login
  end
end
