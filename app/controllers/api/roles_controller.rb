class Api::RolesController < Api::ApplicationController
  include Api::SuperAdminAuthorize
  before_action :authenticate_user
  before_action :super_admin_authorize
  before_action :set_application
  before_action :set_role, only: [:show, :update, :destroy]

  # GET /roles
  # GET /roles.json
  def index
    set_records_count_header @application.roles
    @roles = @application.roles.offset(params[:offset] || 0).limit(params[:limit] || 6).all
    render json: @roles
  end

  # GET /roles/1
  # GET /roles/1.json
  def show
    render json: @role
  end

  # POST /roles
  # POST /roles.json
  def create
    @role = @application.roles.new(role_params)

    if @role.save
      render json: @role, status: :created, location: api_application_role_path(@application, @role)
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /roles/1
  # PATCH/PUT /roles/1.json
  def update
    if @role.update(role_params)
      render json: @role, status: :ok, location: api_application_role_path(@application, @role)
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  # DELETE /roles/1
  # DELETE /roles/1.json
  def destroy
    @role.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_role
      @role = @application.roles.find(params[:id])
    end

    def set_application
      @application = Application.find(params[:application_id])
    end

    # Only allow a list of trusted parameters through.
    def role_params
      params.require(:role).permit([:name])
    end
end
