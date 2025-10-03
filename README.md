🎶 EchoVerse

A Music Library Management System designed to organize, manage, and search music efficiently.

EchoVerse is a full-stack web application that allows users to add, update, and categorize music tracks while ensuring secure authentication. It was built with Angular on the frontend and ASP.NET Core Web API with Entity Framework Core (Code-First) on the backend, showcasing scalable design principles and best practices in full-stack development.

🚀 Features

🔐 Secure Authentication & Authorization using JWT with ASP.NET Core Identity

🎵 CRUD Operations for Music and Category entities

🔎 Search Functionality for quick access to songs

📱 Responsive UI built with Angular

🌐 RESTful API with Entity Framework Core (Code-First) for database management

🛠️ Tech Stack

Frontend: Angular

Backend: ASP.NET Core Web API

Database: SQL Server (Entity Framework Core - Code First)

Authentication: JWT + ASP.NET Core Identity

📂 Project Structure
Echoverse/
│── Cts_Echoverse/        # Backend (.NET Core Web API with EF Core)
│── EchoVerse_UI/         # Frontend (Angular)
│── README.md             # Project Documentation

📌 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/Srishtisinha630/Echoverse.git
cd Echoverse

2️⃣ Backend Setup (ASP.NET Core Web API)
cd Cts_Echoverse


Configure the connection string in appsettings.json

Run migrations:

dotnet ef database update


Start the backend server:

dotnet run

3️⃣ Frontend Setup (Angular)
cd EchoVerse_UI
npm install
ng serve -o


Frontend will be available at http://localhost:4200

Backend API will run at http://localhost:5000
 (or as configured).

📖 Usage

Register/Login with JWT authentication

Add or manage Music Tracks and Categories

Use search to quickly filter songs

Explore music in an organized UI

🧩 Agile Process

Developed in 2 Sprints following Agile methodology

Tracked with JIRA board using Epics, User Stories, and Tasks

Team project (5 members) completed in 6 weeks

📄 License

This project is for learning and demonstration purposes.
