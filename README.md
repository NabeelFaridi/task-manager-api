# Task Manager API

A RESTful API built with ASP.NET Core 8, Entity Framework Core, SQLite, and JWT authentication.

## Tech Stack

- ASP.NET Core 8 Web API
- Entity Framework Core + SQLite
- JWT Bearer Authentication
- Swagger / OpenAPI docs
- BCrypt password hashing

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)

### Run the project

```bash
git clone https://github.com/yourusername/TaskManagerAPI
cd TaskManagerAPI
dotnet restore
dotnet run
```

Then open your browser at: `https://localhost:5001/swagger`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get JWT token |

### Tasks (requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all your tasks |
| GET | /api/tasks/{id} | Get a task by ID |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

## Authentication

1. Register via `POST /api/auth/register`
2. Login via `POST /api/auth/login` to receive a JWT token
3. In Swagger, click "Authorize" and enter: `Bearer {your_token}`
4. All `/api/tasks` endpoints are now accessible

## Project Structure

```
TaskManagerAPI/
├── Controllers/       # API route handlers
├── Models/            # Database entities
├── Data/              # EF Core DbContext
├── DTOs/              # Request/response models
├── Services/          # JWT token generation
└── Program.cs         # App configuration & middleware
```
