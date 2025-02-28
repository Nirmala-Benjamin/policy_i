
# PolicyRequest

## Overview
PolicyRequest is an Angular application that allows users to request a policy through a simple workflow. The application consists of multiple steps to collect personal information, policy details, and submit the request.

## Features
- Multi-step workflow for policy request
- Personal information form
- Policy questions form
- Summary and submission
- Basic validation and state management
- Mock API integration
- Basic support for translation

## Functional Requirements
### Step 1: Personal Information
- First name (required)
- Last name (required)
- E-mail address (required, with RegExp validation)
- Birth date (required, format: dd/MM/yyyy, must be at least 18 years old)
- Language (required, English and Dutch language)
- Next button

### Step 2: Policy Questions
- Policy start date (required, format: yyyy-MM-dd, must be the first of the month and within 3 months in the future)
- Insurance product selection (required, dropdown list from mocked API)
  - Car insurance
  - Health insurance
  - Liability insurance
- Previous/Next button

### Step 3: Summary of the Request
- Display personal information and policy details
- Edit button to modify personal information in a modal
- Previous/Next button

### Step 4: Submission / Thank You Page
- Confirmation message before submission
- Thank you message on confirmation
- Submit request to a mock API (log the request)
- Previous/Submit button

## Technical Requirements
- Angular framework (version 12.0.0)
- Component-based architecture
- Basic validation and state management
- Mock API for insurance product list and submission
- Localized support for multiple languages
- Theme support based on a simple parameter

## Installation

### Windows
1. Clone the repository:
    ```bash
    git clone https://github.com/Nirmala-Benjamin/policy_i.git
    cd PolicyRequest
    ```
2. Install Node.js and npm from [Node.js official website](https://nodejs.org/).
3. Install Angular CLI globally:
    ```bash
    npm install -g @angular/cli
    ```
4. Install project dependencies:
    ```bash
    npm install
    ```

### Linux
1. Clone the repository:
    ```bash
    git clone https://github.com/Nirmala-Benjamin/policy_i.git
    cd PolicyRequest
    ```
2. Install Node.js and npm using your package manager, for example:
    ```bash
    sudo apt update
    sudo apt install nodejs npm
    ```
3. Install Angular CLI globally:
    ```bash
    sudo npm install -g @angular/cli
    ```
4. Install project dependencies:
    ```bash
    npm install
    ```

## Usage
To run the project locally, use the following command:

```bash
ng serve
```

Then open your browser and navigate to `http://localhost:4200`.
