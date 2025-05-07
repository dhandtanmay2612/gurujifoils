# DriveSafeAI Backend

This is the backend API for DriveSafeAI, a smart driver behavior analysis system. The API is built using FastAPI and provides endpoints for user authentication, profile management, and driving data analysis.

## Features

- User authentication with JWT tokens
- User profile and settings management
- Driving score calculation and tracking
- Trip history and analysis
- Behavior analysis and recommendations

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with the following variables:
```
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

4. Run the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`. API documentation can be accessed at `http://localhost:8000/docs`.

## API Endpoints

### Authentication
- POST `/auth/token` - Login and get access token
- POST `/auth/register` - Register new user
- GET `/auth/users/me` - Get current user info

### Users
- GET `/users/profile` - Get user profile
- PUT `/users/profile` - Update user profile
- GET `/users/settings` - Get user settings
- PUT `/users/settings` - Update user settings
- DELETE `/users/account` - Delete user account

### Driving Data
- GET `/driving/trips` - Get user's trip history
- GET `/driving/trips/{trip_id}` - Get specific trip details
- GET `/driving/score` - Get user's driving score
- GET `/driving/analysis` - Get behavior analysis

## Development

The project structure is organized as follows:

```
backend/
├── app/
│   ├── api/
│   │   ├── auth.py
│   │   ├── users.py
│   │   └── driving.py
│   ├── models/
│   ├── schemas/
│   ├── core/
│   └── main.py
├── requirements.txt
└── README.md
```

## Security

- All endpoints except registration and login require authentication
- Passwords are hashed using bcrypt
- JWT tokens are used for session management
- CORS is configured to allow requests from the frontend development server

## Future Improvements

- Implement real database integration (e.g., PostgreSQL)
- Add email verification
- Implement password reset functionality
- Add rate limiting
- Add request validation middleware
- Implement real-time data processing
- Add unit tests and integration tests 