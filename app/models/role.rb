class Role < ApplicationRecord
  belongs_to :application
  validates_presence_of :name
  validates_uniqueness_of :name, scope: :application_id
end
