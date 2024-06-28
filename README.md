# Async Race

## View the Project
You can view the deployment of Async Race Application here: [Async Race App]([https://your-deployment-url](https://rolling-scopes-school.github.io/chekhanadski-JSFE2023Q4/async-race/)).

## Description
Welcome to the Async Race Application! This app allows you to manage a collection of radio-controlled cars, operate their engines, and showcase race statistics in an engaging, interactive Single Page Application (SPA).

## Key Features
**1. Garage View**
- CRUD operations for cars with "name" and "color" attributes.
- Color selection from an RGB palette with a preview of the car in the chosen color.
- Pagination to display cars (7 per page) and a feature to generate 100 random cars at once.

**2. Car Animation**
- Start/stop engine buttons with corresponding animations and handling of engine states.
- Adaptive animations that work on screens as small as 500px.

**3. Race Animation**
- A button to start a race for all cars on the current page.
- A reset button to return all cars to their starting positions.
- Display the winner's name upon race completion.

**4. Winners View**
- Display winning cars with their image, name, number of wins, and best time.
- Pagination and sorting capabilities by wins and best times.

## Technology Stack

**General:**
- TypeScript
- HTML5
- CSS3
- JavaScript

**Development Tools:**

- Webpack for module bundling
- Eslint and Prettier for code formatting and linting
- API calls for server interactions

## Available Scripts in the Project

This project includes several scripts for development, building, testing, and code formatting. Here's a brief overview of each script and its usage:

### build

```sh
npm run build
```

This script creates a production-ready build of the application.

### start

```sh
npm run start
```

This script starts the development server.

### format

```sh
npm run format
```

This script formats the codebase using Prettier. Use this to enforce a consistent code style across the project.

### lint

```sh
npm run lint
```

This script runs ESLint on the codebase. Use this to catch and fix syntax errors, find problematic patterns, and enforce code style.

### ci

```sh
npm run ci:format
```

This script checks the code formatting using Prettier to ensure consistency in the codebase.

## Setting Up and Running the Project Locally

Here are the steps to get you started:

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm.
- You have a Windows/Linux/Mac machine.
- You have cloned and set up the server application.
  
### Setting Up the Project

To set up the project, follow these steps:

**1. Clone the repository**

Open your terminal, navigate to the directory where you want to clone the repository, and run the following command:

```sh
git clone https://github.com/your-username/async-race
```

This will clone the repository to your local machine.

**2. Navigate to the project directory**

Change your current directory to the project directory:

```sh
cd game-async-race
```

**3. Install the dependencies**

Now, run the following command to install all the project dependencies:

```sh
npm install
```

This command installs all the necessary packages required for the project.

**4. Setting up the server application**

Clone the server application from [here](https://github.com/mikhama/async-race-api) and follow the instructions in the server application's README to set it up and run it.

Important Note: The Async Race application will only work when the server application or the mock server is running. Make sure to start the server before running the client application.

**5. Running the Project**

After setting up both the client and server applications, you can now run the project locally using:

```sh
npm start
```

This command starts the development server and the project will be up and running on your local machine.
