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

  it "is invalid with zero or negative salary" do
    expect(build(:employee, salary: 0)).not_to be_valid
    expect(build(:employee, salary: -100)).not_to be_valid
  end

  it "is invalid with name over 100 chars" do
    expect(build(:employee, first_name: "A" * 101)).not_to be_valid
  end

  it "is invalid when duplicate name+job+country exists" do
    emp = create(:employee)

    duplicate = build(
      :employee,
      first_name: emp.first_name,
      last_name: emp.last_name,
      job_title: emp.job_title,
      country: emp.country
    )

    expect(duplicate).not_to be_valid
  end
end
