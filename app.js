import express from "express";
import next from "next";

// Determine the environment (development or production)
const dev = process.env.NODE_ENV !== "production";

// Initialize the Next.js app
const app = next({ dev });

// Get the request handler from Next.js
const handle = app.getRequestHandler();

// Prepare the Next.js app
app.prepare().then(() => {
  // Create an Express server
  const server = express();

  // Custom API route
  server.get("/api/custom", (req, res) => {
    res.json({ message: "This is a custom API route!" });
  });

  // Handle all other requests with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
