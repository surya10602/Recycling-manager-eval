# Recycling Production Line Manager Selection System

## Overview
A standalone system for ranking candidates for a recycling production line manager role. This project includes a database schema, a random candidate generator, AI evaluation prompts, and a React dashboard for visualizing candidate rankings.

## Features
* **Dashboard:** Built with React, Vite, and Mantine UI. Displays a leaderboard and detailed skill breakdowns.
* **Data Generation:** Uses `Faker.js` to generate realistic candidate profiles and mock AI scores.
* **Database:** MySQL schema for candidates, evaluations, and rankings.

## Project Structure
* `dashboard`: Frontend code (React + Vite).
* `scripts`: Database schema (`schema.sql`) and data generator (`generate_data.js`).
* `AI_Prompts.md`: Three prompts designed for AI evaluation of candidates.
* `sample_data.json`: The generated dataset used by the dashboard.

## Setup Instructions

### Prerequisites
* Node.js installed.

### 1. Database Setup
The file `scripts/schema.sql` contains the MySQL schema. You can import this into any MySQL-compatible database.

### 2. Generate Data (Optional)
The project comes with pre-generated data. To regenerate:
```bash
cd scripts
npm install
node generate_data.js
```

### Run the Dashboard
```bash
cd dashboard
npm install
npm run dev
```
