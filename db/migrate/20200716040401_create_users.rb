class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.boolean :is_admin, default: false
      t.string :first_name
      t.string :last_name,

      t.timestamps
    end
  end
end
