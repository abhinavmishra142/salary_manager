class InsightsController < ApplicationController
  def country
    if params[:country].blank?
      return render json: { error: "country parameter is required" }, status: :bad_request
    end

    employees = Employee.where(country: params[:country])

    render json: {
      min: employees.minimum(:salary),
      max: employees.maximum(:salary),
      avg: employees.average(:salary).to_f
    }
  end

  def job
    if params[:country].blank? || params[:job_title].blank?
      return render json: { error: "country and job_title are required" }, status: :bad_request
    end

    employees = Employee.where(
      country: params[:country],
      job_title: params[:job_title]
    )

    render json: {
      avg: employees.average(:salary).to_f
    }
  end
end