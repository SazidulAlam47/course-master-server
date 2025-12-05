# Course Master - Backend

Course management system with enrollment, payment integration, quiz & assignment submission, and progress tracking.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT & NextAuth
- **Payment Gateway:** SSLCommerz
- **Validation:** Zod
- **Email:** Nodemailer

## Installation

```bash
pnpm install
```

## Run

```bash
# Development
pnpm dev

# Production
pnpm build
pnpm start
```

## Environment Variables

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/course-master

BCRYPT_SALT_ROUNDS=12

NODE_MAILER_EMAIL=your-email@gmail.com
NODE_MAILER_PASSWORD=your-app-password

AUTH_SECRET=your-nextauth-secret

RESET_PASS_TOKEN=your-reset-token-secret
RESET_PASS_TOKEN_EXPIRES_IN=10m

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

CLIENT_URL=http://localhost:3000

STORE_ID=your-sslcommerz-store-id
STORE_PASS=your-sslcommerz-password
```

## API Documentation

Base URL: `http://localhost:5000/api/v1`

### Auth

- `POST /auth/register` - Register student
- `POST /auth/login` - Login user
- `POST /auth/change-password` - Change password (auth)
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Users

- `GET /users/me` - Get current user (auth)
- `GET /users` - Get all users (admin)
- `GET /users/:id` - Get user by ID (admin)
- `PATCH /users/:id` - Update user (admin)
- `DELETE /users/:id` - Delete user (admin)

### Instructors

- `POST /instructors` - Create instructor (admin)
- `GET /instructors` - Get all instructors
- `GET /instructors/:id` - Get instructor by ID
- `PATCH /instructors/:id` - Update instructor (admin)
- `DELETE /instructors/:id` - Delete instructor (admin)

### Categories

- `POST /categories` - Create category (admin)
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `PATCH /categories/:id` - Update category (admin)
- `DELETE /categories/:id` - Delete category (admin)

### Courses

- `POST /courses` - Create course (admin)
- `GET /courses` - Get published courses
- `GET /courses/admin` - Get all courses (admin)
- `GET /courses/:id` - Get course by ID
- `PATCH /courses/:id` - Update course (admin)
- `DELETE /courses/:id` - Delete course (admin)

### Lessons

- `POST /lessons` - Create lesson (admin)
- `GET /lessons/:courseId/:order` - Get lesson by order (student)
- `PATCH /lessons/:id` - Update lesson (admin)
- `DELETE /lessons/:id` - Delete lesson (admin)

### Enrollments

- `POST /enrollments` - Enroll in course (student)
- `GET /enrollments/my-enrollments` - Get my enrollments (student)
- `GET /enrollments/:id` - Get enrollment by ID (auth)
- `GET /enrollments` - Get all paid enrollments (admin)

### Payment

- `POST /payment/success` - Payment success callback
- `POST /payment/fail` - Payment fail callback
- `POST /payment/cancel` - Payment cancel callback

### Quiz Attempts

- `POST /quiz-attempts` - Submit quiz (student)
- `GET /quiz-attempts/:lessonId` - Get quiz attempts by lesson (auth)

### Assignments

- `POST /assignments` - Submit assignment (student)
- `GET /assignments/:lessonId` - Get assignments by lesson (auth)
- `PATCH /assignments/:id` - Update assignment feedback (admin)

### Meta

- `GET /meta` - Get dashboard metrics (admin)
