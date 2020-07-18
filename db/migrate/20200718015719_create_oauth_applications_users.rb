class CreateOauthApplicationsUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :oauth_applications_users do |t|
      t.belongs_to :application
      t.belongs_to :user
    end
  end
end
