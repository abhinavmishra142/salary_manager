class InsightsController < ApplicationController
  def country
    employees = Employee.where(country: params[:country])

    render json: {
      min: employees.minimum(:salary),
      max: employees.maximum(:salary),
      avg: employees.average(:salary).to_f
    }
  end
end