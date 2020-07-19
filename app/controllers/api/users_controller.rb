class Api::UsersController < Api::ApplicationController
  include Api::SuperAdminAuthorize
  before_action :authenticate_user
  before_action :super_admin_authorize
  before_action :set_application
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    set_records_count_header @application.users
    @users = @application.users.offset(params[:offset] || 0).limit(params[:limit] || 6).all
    render json: @users
  end

  # GET /users/1
  # GET /users/1.json
  def show
    render json: @user
  end

  # POST /users
  # POST /users.json
  def create
    @user = @application.users.create(user_params)

    if @user.valid?
      render json: @user, status: :created, location: api_application_user_path(@application,@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if @user.update(user_params)
      render json: @user, status: :ok, location: api_application_user_path(@application,@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = @application.users.find(params[:id])
    end

    def set_application
      @application = Application.find(params[:application_id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, role_ids: [])
    end
end
