class UserSerializer < BaseSerializer
  attributes :id, :first_name, :last_name, :email, :role_ids
end
