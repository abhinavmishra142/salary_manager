# spec/factories/employees.rb
FactoryBot.define do
  factory :employee do
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }
    job_title  { ["Engineer", "Manager", "HR"].sample }
    country    { ["India", "USA", "UK"].sample }
    salary     { rand(30000..150000) }
  end
end
