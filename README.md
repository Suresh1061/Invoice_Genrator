# Invoice Generator

A full-stack **Invoice Generator** application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and styled with **Tailwind CSS** and **ShadCN UI**. This application allows users to log in, register, manage product details, and generate invoices that can be downloaded as **PDFs**. The application leverages **PDFKit** for PDF generation and **Redux** for state management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)


## Features

### User Authentication
- **Registration**:
  - Users can register with their name, email, and password.
  - All fields are validated to ensure data accuracy.
- **Login**:
  - Users can log in using their email and password.

### Product Management
- Add product details, including:
  - **Name**
  - **Quantity**
  - **Rate**
- Automatically calculate total price and GST.
- Easily delete products from the table.

### Invoice Generation
- Generate invoices dynamically based on user inputs.
- Download invoices as high-quality PDFs using **PDFKit**.

### State Management
- Handles state efficiently using **Redux** and **React-Persist** for seamless user experience.



## Tech Stack

### Frontend
- **React.js** for building the UI.
- **Redux** & **React-Persist** for state management.
- **Tailwind CSS** & **ShadCN UI** for modern and responsive design.
- **Vite.js** for optimized build and development.
- **TypeScript** for type safety.
- **Zod** for schema validation.
- **Axios** for HTTP requests.

### Backend
- **Node.js** with **Express.js** for handling server-side logic.
- **MongoDB** for database management.
- **PDFKit** for generating PDF invoices.

## Installation

To set up this project locally, follow these steps:

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/Suresh1061/Invoice_Genrator.git
   cd Invoice_Genrator
   ```

2. Install dependencies:
   - For the Frontend:
   ``` bash
   cd frontend
   npm install
   ```
   - For the Backend:
   ``` bash
   cd backend
   npm install
   ```

3. Start the Backend server:
   ```bash
   cd backend
   npm run dev
   ```

4. Start the Frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
