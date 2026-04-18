# Planning Notes

## Problem Understanding
Build a salary management tool for HR with:
- Employee CRUD
- Salary insights
- Scale: 10,000 employees

## Key Decisions
- Backend: Ruby on Rails (fast CRUD, ActiveRecord)
- Frontend: React (interactive UI)
- DB: SQLite (simple setup)

## Tradeoffs
- Used simple pagination instead of cursor-based
- Chose REST APIs over GraphQL for simplicity

## Performance Considerations
- Added pagination to avoid loading 10k records
- Added DB indexes on country and job_title

## Future Improvements
- Authentication
- Advanced analytics