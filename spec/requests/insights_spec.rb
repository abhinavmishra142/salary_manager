# spec/requests/insights_spec.rb
require 'rails_helper'

RSpec.describe "Insights API", type: :request do
  describe "GET /insights/country" do
    it "returns salary stats for a country" do
      create(:employee, country: "India", salary: 100)
      create(:employee, country: "India", salary: 200)

      get "/insights/country?country=India"

      data = JSON.parse(response.body)

      expect(data["min"]).to eq(100)
      expect(data["max"]).to eq(200)
      expect(data["avg"]).to eq(150.0)
    end

    it "returns nil values when no employees exist" do
      get "/insights/country?country=India"

      expect(response).to have_http_status(:ok)

      data = JSON.parse(response.body)

      expect(data["min"]).to be_nil
      expect(data["max"]).to be_nil
      expect(data["avg"]).to eq(0.0)
    end

    it "returns error when country param is missing" do
      get "/insights/country"

      expect(response).to have_http_status(:bad_request)

      data = JSON.parse(response.body)

      expect(data["error"]).to eq("country parameter is required")
    end
  end

  describe "GET /insights/job" do
    it "returns avg salary for job title in country" do
      create(:employee, country: "India", job_title: "Engineer", salary: 100)
      create(:employee, country: "India", job_title: "Engineer", salary: 300)

      get "/insights/job?country=India&job_title=Engineer"

      data = JSON.parse(response.body)

      expect(data["avg"]).to eq(200.0)
    end

    it "returns empty stats when no employees match country" do
      create(:employee, country: "USA", salary: 50000)

      get "/insights/country?country=India"

      data = JSON.parse(response.body)

      expect(data["min"]).to be_nil
      expect(data["max"]).to be_nil
      expect(data["avg"]).to eq(0.0)
    end

    it "returns error if params missing" do
      get "/insights/job"

      expect(response).to have_http_status(:bad_request)

      data = JSON.parse(response.body)

      expect(data["error"]).to eq("country and job_title are required")
    end
  end
end
