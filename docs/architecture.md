# Architecture Overview

## High Level Flow

React UI → Rails API → SQLite DB

## Components

### Frontend
- React components:
  - Employees
  - CountryInsights
  - JobInsights

### Backend
- Controllers:
  - EmployeesController
  - InsightsController

### Database
- employees table:
  - full_name
  - job_title
  - country
  - salary

## Diagram (text)

[React UI]
     ↓
[Rails Controllers]
     ↓
[ActiveRecord Models]
     ↓
[SQLite DB]