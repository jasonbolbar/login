class CreateRolesUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :roles_users do |t|
      t.belongs_to :role
      t.belongs_to :user
    end
  end
end
