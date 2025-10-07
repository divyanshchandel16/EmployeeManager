# Employee Data Manager

## Description
A straightforward CRUD (Create, Read, Update, Delete) application to manage a list of employees. Integrates MongoDB Backend with React Frontend.

## Related Links 
Live Link - https://employee-manager-7rut.vercel.app/

Video Walkthrough - https://drive.google.com/file/d/1GOvKAu25EoSyLv7xbyNBwtpiMmS9qo4_/view?usp=sharing


## Features
-Persists data locally.

-Blocks duplicate entries

-Basic CRUD

-Clean intuitive UI

## Steps To Run locally

### 1) Backend
 - create `backend/.env` with:
   - `MONGO_URI=mongodb://127.0.0.1:27017/employee_mvp`
   - `PORT=5000`
 - start: `npm run dev:backend`

### 2) Frontend
 - start: `npm run dev:frontend`

## Endpoints
 - GET `http://localhost:5000/api/employees` || `https://employee-manager-pearl.vercel.app/api/employees`
 - POST `http://localhost:5000/api/employees` || `https://employee-manager-pearl.vercel.app/api/employees`
 - PUT `http://localhost:5000/api/employees/:id` || `https://employee-manager-pearl.vercel.app/api/:id`
 - DELETE `http://localhost:5000/api/employees/:id` || `https://employee-manager-pearl.vercel.app/api/:id`

 ## UI Thumbnail
<img width="950" height="539" alt="image" src="https://github.com/user-attachments/assets/4aa72ce4-05ca-4e74-aa7f-ae252fff35e7" />
