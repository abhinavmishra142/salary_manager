class Employee < ApplicationRecord
  validates :first_name, :last_name, :job_title, :country, :salary, presence: true
  validates :salary, numericality: { greater_than: 0 }
  validates :first_name, :last_name, :job_title, :country, length: { maximum: 100 }
  validates_uniqueness_of :first_name, scope: [:last_name, :job_title, :country], message: "An employee with the same name, job title, and country already exists"

  def full_name
    "#{first_name} #{last_name}"
  end
end
