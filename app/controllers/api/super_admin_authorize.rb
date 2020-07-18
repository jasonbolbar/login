module Api::SuperAdminAuthorize
  def super_admin_authorize
    head(:unauthorized) unless current_user.is_admin
  end
end