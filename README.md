
# 🧠 Quiz Builder app

A full-stack web app for creating, deleting, and displaying quizzes. 


## 🛠 Tech Stack

### Frontend
- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant forms with easy validation
- **React Query** - Data fetching and state management

### Backend
- **NestJS** - Scalable Node.js framework
- **Prisma** - Next-generation ORM
- **Swagger** - API documentation

### Database
- **PostgreSQL** - Robust relational database

## 🚀 Getting Started

### Prerequisites

- Node.js
- PostgreSQL database
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/KristianMedeshi/quiz-builder.git
cd quiz-builder
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Create a .env file in the backend directory and add your database configuration:
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/quiz-builder
```

Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev
```

Start the backend server:
```bash
npm start
```
The backend will be available at http://localhost:3000 by default.

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```
Install dependencies
```bash
npm install
```
Create a .env file in the backend directory and API base URL configuration:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Start the app
```bash
npm run build
PORT=3001 npm start
```
Or for development
```bash
npm run dev
```
The frontend will be available at http://localhost:3001.

# 📖 Usage

Click "Create New Quiz" button in the top navigation bar.

Enter your quiz title.

Use the "Add Question" button to add new questions.

For each question add:
* Question Type: Choose from Boolean, Input, or Checkbox
* Question Text: Enter your question
* Answer/Options: Provide the correct answer or multiple choice options

# 🔧 API Documentation
Once the backend is running, visit http://localhost:3000/api to view the interactive Swagger API documentation.