class Api::ApplicationsController < Api::ApplicationController
  include Api::SuperAdminAuthorize
  before_action :authenticate_user
  before_action :super_admin_authorize
  before_action :set_application, only: [:show, :update, :destroy]

  # GET /applications
  # GET /applications.json
  def index
    @applications = Application.offset(params[:offset] || 0).limit(params[:limit] || 6).all
    render json: @applications
  end

  # GET /applications/1
  # GET /applications/1.json
  def show
    render json: @application
  end

  # POST /applications
  # POST /applications.json
  def create
    @application = Application.new(application_params)

    if @application.save
      render json: @application, status: :created, location: api_application_path(@application)
    else
      render json: @application.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /applications/1
  # PATCH/PUT /applications/1.json
  def update
    if @application.update(application_params)
      render json: @application, status: :ok, location: api_application_path(@application)
    else
      render json: @application.errors, status: :unprocessable_entity
    end
  end

  # DELETE /applications/1
  # DELETE /applications/1.json
  def destroy
    @application.destroy

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_application
      @application = Application.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def application_params
      params.require(:application).permit([:name, :redirect_uri])
    end
end
