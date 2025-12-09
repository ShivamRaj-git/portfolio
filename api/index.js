// Vercel serverless function for API routes
const express = require('express');
const app = express();

// Import the built server
const server = require('../dist/index.cjs');

// Export as Vercel serverless function
module.exports = app;
