# spec/models/employee_spec.rb
require 'rails_helper'

RSpec.describe Employee, type: :model do
  it "creates valid employee via factory" do
    employee = build(:employee)
    expect(employee).to be_valid
  end

  it "is invalid without first_name" do
    employee = Employee.new(first_name: nil)
    expect(employee).not_to be_valid
  end
end
