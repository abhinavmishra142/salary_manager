# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

first_names = File.readlines(Rails.root.join('db/first_names.txt')).map(&:strip)
last_names = File.readlines(Rails.root.join('db/last_names.txt')).map(&:strip)

Employee.delete_all #Deleting existing record as engineers will run this script regularly

employees = []

10000.times do
  first = first_names.sample
  last = last_names.sample

  employees << {
    first_name: first,
    last_name: last,
    job_title: ["Engineer", "Manager", "HR"].sample,
    country: ["India", "USA", "UK"].sample,
    salary: rand(30000..150000),
    created_at: Time.now,
    updated_at: Time.now
  }
end

Employee.insert_all(employees)