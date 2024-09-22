# Condo Complaints

The Condo Complaints project is a web application built with React.js that allows residents to report issues within
their condominium complex, view existing complaints, and manage their submissions.

## Features

- User-friendly interface for reporting complaints.
- View existing complaints.
- Filter complaints
- Responsive design for accessibility on various devices.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- follow the setup instructions in the `README.md` of
  the [Condo Complaints Backend](https://github.com/celeste2325/Condo-complaints-back-end) repository to configure the
  backend service.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/condo-complaints-frontend.git
   cd condo-complaints-frontend
   ```

Install dependencies:

```bash
npm install
```

## Usage

```bash
npm start
```

## Test Data

For testing purposes

**Login**

- **Admin User:**
    - **DNI:** CPA3449614
    - **Password:** 1234
    - **Role:** Admin
    -
- **User 1:**
    - **DNI:** DNI30722275
    - **Password:** 123456
    - **Role:** User

- **User 2:**
    - **DNI:** DNI30734108
    - **Password:** 1234
    - **Role:** User

- **User 3:**
    - **DNI:** DNI30814171
    - **Password:** 1234
    - **Role:** User

These credentials will allow you to access the application.

**Sign Up Data**

<u>Valid Registration</u>
Use data from the `people` table that does not have associated credentials. For example:

- **Name:** John Doe
- **DNI:** DNI30724625 (ensure this DNI does not already exist in the credentials)
- **Password:** password123

<u>Error Scenarios</u>

1. **Existing User:** Try signing up with a DNI that is already registered in the app, such as:
    - **DNI:** DNI30722275
    - **Password:** 123456

2. **Non-Existent Document:** Attempt to register using a DNI that does not exist in the `people` table, such as:
    - **DNI:** DNI99999999
    - **Password:** newpassword

## License

[MIT](https://choosealicense.com/licenses/mit/)
