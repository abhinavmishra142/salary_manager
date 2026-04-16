# spec/models/employee_spec.rb
require 'rails_helper'

RSpec.describe Employee, type: :model do
  it "is valid with valid attributes" do
    employee = Employee.new(
      first_name: "John",
      last_name: "Doe",
      job_title: "Engineer",
      country: "India",
      salary: 50000
    )
    expect(employee).to be_valid
  end

  it "is invalid without first_name" do
    employee = Employee.new(first_name: nil)
    expect(employee).not_to be_valid
  end
end
