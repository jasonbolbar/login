class User < ApplicationRecord
  has_secure_password
  validates_presence_of :email, :first_name, :last_name
  validates_uniqueness_of :email

  has_and_belongs_to_many :applications
  has_and_belongs_to_many :roles

  before_validation :set_user_password

  def to_token_payload
    {
        sub: self.id,
        email: self.email,
        name: self.full_name,
        is_admin: self.is_admin,
    }
  end

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def set_user_password
    self.password = 'password' if password_digest.nil?
  end
end
