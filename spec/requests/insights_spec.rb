# spec/requests/insights_spec.rb
RSpec.describe "Insights API", type: :request do
  it "returns salary stats for a country" do
    create(:employee, country: "India", salary: 100)
    create(:employee, country: "India", salary: 200)

    get "/insights/country?country=India"

    data = JSON.parse(response.body)

    expect(data["min"]).to eq(100)
    expect(data["max"]).to eq(200)
    expect(data["avg"]).to eq(150.0)
  end
end
