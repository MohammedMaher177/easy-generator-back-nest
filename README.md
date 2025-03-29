# Easy Generator Back Nest

## Introduction
Easy Generator Back Nest is a project designed to [provide a brief description of what your project does]. This project is built using NestJS and TypeScript, focusing on delivering a robust and efficient solution for [mention the primary problem the project solves or the main feature it offers].

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication:**
  - **User Validation:** Validates user credentials by checking the email and password against stored user data. It throws an `UnauthorizedException` if the credentials are invalid.
  - **Token Validation:** Validates the provided JWT token. It throws a `ForbiddenException` if no token is provided and an `UnauthorizedException` if the token is invalid.
  - **Login:** Generates a JWT access token for authenticated users.
  - **Register:** Creates a new user and logs them in by generating a JWT access token.

- **User Management:**
  - **Create User:** Creates a new user with a hashed password. It throws a `ConflictException` if the email already exists.
  - **Find User by Email:** Finds a user by their email address.
  - **Find User by ID:** Finds a user by their ID.

- **Todo Management:**
  - **Create Todo:** Creates a new todo item for a user.
  - **Find All Todos by User:** Retrieves all todos for a specific user with support for pagination, sorting, and filtering.
  - **Update Todo:** Updates an existing todo item for a user.
  - **Delete Todo:** Soft deletes a todo item for a user by setting the `isDeleted` flag.
  - **Get Todo Report:** Generates a report of todos categorized by category and priority for a user.
  - **Generate Sample Todos:** Generates a set of sample todos for testing purposes.

## Technologies Used
- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript:** A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Mongoose:** A MongoDB object modeling tool designed to work in an asynchronous environment.
- **bcryptjs:** A library to help you hash passwords.
- **RxJS:** A reactive programming library for JavaScript.
- **dotenv:** A module that loads environment variables from a `.env` file into `process.env`.
- **Jest:** A delightful JavaScript testing framework with a focus on simplicity.
- **Supertest:** A library for testing HTTP servers.

## Installation
Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/MohammedMaher177/easy-generator-back-nest.git
   cd easy-generator-back-nest