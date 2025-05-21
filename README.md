# QR Forge - QR Code Generator and Scanner

## Description

A web application for generating customizable QR codes and scanning existing ones. Supports various styling options, logo embedding, and different output sizes.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd qr-code-generator-2
   ```
2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Running the project

To run the development server:

```bash
pnpm run dev
```

The application should now be running at `http://localhost:3000`. 

## How it's Made

This application is built using the following technologies:

-   **Next.js:** A React framework for server-side rendering and static site generation. It provides the file-based routing and API routes used in the project.
-   **React:** The JavaScript library for building the user interface components.
-   **Tailwind CSS:** A utility-first CSS framework used for styling the application.
-   **qrcode.react:** A React component used for generating the QR code SVG.
-   **jsQR:** A JavaScript library used for scanning QR codes from image data on the client-side.
-   **pnpm:** The package manager used to install and manage project dependencies. 