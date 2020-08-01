class Api::ApplicationController < ActionController::API
  include Knock::Authenticable
  rescue_from StandardError do |exception|
    render json: { :error => exception.message }, :status => 500
  end

  private

  def set_records_count_header(instance)
    response.set_header('Pagination-Total', instance.count)
  end

  def filterBySearch(scope)
    params[:searchTerm].present? ? scope.where("name LIKE ?","%#{params[:searchTerm]}%") : scope
  end
end
