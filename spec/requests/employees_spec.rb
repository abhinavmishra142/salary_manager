# spec/requests/employees_spec.rb
require 'rails_helper'

RSpec.describe "Employees API", type: :request do
  describe "GET /employees" do
    it "returns list of employees" do
      create_list(:employee, 3)

      get "/employees"

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to eq(3)
    end
  end

  describe "POST /employees" do
    it "creates an employee" do
      params = {
        employee: {
          first_name: "John",
          last_name: "Doe",
          job_title: "Engineer",
          country: "India",
          salary: 50000
        }
      }

      post "/employees", params: params

      expect(response).to have_http_status(:created)
    end
  end

  describe "PATCH /employees/:id" do
    it "updates employee" do
      employee = create(:employee)

      patch "/employees/#{employee.id}", params: { employee: { salary: 70000 } }

      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /employees/:id" do
    it "deletes employee" do
      employee = create(:employee)

      delete "/employees/#{employee.id}"

      expect(response).to have_http_status(:no_content)
    end
  end
end
