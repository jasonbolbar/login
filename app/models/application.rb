class Application < Doorkeeper::Application
  has_and_belongs_to_many :users, dependent: :destroy
  has_many :roles, dependent: :destroy
  before_create :set_default_scope
  validates_uniqueness_of :name

  private

  def set_default_scope
    self.scopes = ['read']
  end
end
