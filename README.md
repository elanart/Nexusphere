# Project Management System Nexusphere

This is a full-stack project management system for managing projects between clients and freelancers. The system is built using **Next.js** (front-end and back-end), with **TypeScript**, **Prisma** ORM.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Advantages](#dvantages)
- [Disadvantages](#disadvantages)

## Project Structure

The project has the following structure:
├── client/ # Frontend - Next.js 
├── server/ # Backend - Fastify 
└── README.md # Project documentation

- `client/`: Contains the front-end (Next.js) application.
- `server/`: Contains the back-end (Fastify) API services.

## Prerequisites
Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 16.x or above)
- [Yarn](https://yarnpkg.com/) (or npm if preferred)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/project-management-system.git
cd project-management-system
```

### 2. Install dependencies

#### Front-end
```bash
cd client
npm i
```

#### Back-end
```bash
cd server
npm i
```

## Running the Project

### 1. Start the server
Ensure you are in the server/ directory, then run:
```bash
npm run dev
```

This will start the server at `http://localhost:4000`.

### 2. Start the client
Ensure you are in the client/ directory, then run:
```bash
npm run dev
```

The front-end will start on `http://localhost:3000`.

## API Endpoints
Below are the APIs that have been tested and run successfully.
- `http://localhost:4000/auth/register`: Register user
- `http://localhost:4000/auth/login`: Login user
- `http://localhost:4000/auth/logout`: Logout user

In addition I have designed the following APIs:
- `http://localhost:4000/api/projects`: CRUD with projects
- `http://localhost:4000/api/projects/project-details`: Create project details
- `http://localhost:4000/api/projects/tasks`: CRUD with tasks

## Advantages
- This project is built with a clear structure, separating client and server to help with development and testing.
- Project uses JWT for security

## Disadvantages
- There are still many most important functions of the project that have not been done yet: CRUD with projects, tasks, providing communication protocol between client and freelancer. (Will try to develop more)
