Employee Manager MVP

Run locally

1) Backend
 - create `backend/.env` with:
   - `MONGO_URI=mongodb://127.0.0.1:27017/employee_mvp`
   - `PORT=5000`
 - start: `npm run dev:backend`

2) Frontend
 - start: `npm run dev:frontend`

3) Both (proxy configured)
 - `npm run dev`

Endpoints
 - GET `http://localhost:5000/api/employees`
 - POST `http://localhost:5000/api/employees`
 - PUT `http://localhost:5000/api/employees/:id`
 - DELETE `http://localhost:5000/api/employees/:id`


