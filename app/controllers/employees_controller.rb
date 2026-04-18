class EmployeesController < ApplicationController
  def index
    page = params[:page].to_i || 1
    per_page = 20

    page = 1 if page <= 0

    employees = Employee
                  .offset((page - 1) * per_page)
                  .limit(per_page)

    render json: {
      employees: employees.as_json(methods: :full_name),
      page: page,
      total_count: Employee.count
    }
  end

  def create
    employee = Employee.new(employee_params)

    if employee.save
      render json: employee, status: :created
    else
      render json: { errors: employee.errors }, status: :unprocessable_entity
    end
  end

  def update
    employee = Employee.find(params[:id])

    return render json: { error: "Employee not found" }, status: :not_found unless employee


    if employee.update(employee_params)
      render json: employee
    else
      render json: { errors: employee.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    employee = Employee.find(params[:id])
    
    return render json: { error: "Employee not found" }, status: :not_found unless employee

    employee.destroy

    head :no_content
  end

  private

  def employee_params
    params.require(:employee).permit(:first_name, :last_name, :job_title, :country, :salary)
  end
end
