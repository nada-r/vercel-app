// index.js
const express = require('express');
const fetch = require('node-fetch'); // Make sure to install node-fetch or similar to make HTTP requests

const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

// Your new /api/verify route
app.post('/api/verify', async (req, res) => {
  const proof = req.body; // Assuming the frontend sends the proof in the request body
  const your_app_id = 'YOUR_APP_ID'; // Replace this with your actual app ID
  const action_id = 'YOUR_ACTION_ID'; // Replace this with your actual action ID

  try {
    const verifyRes = await fetch(`https://developer.worldcoin.org/api/v1/verify/${app_c7e5d4b63c67526e8d1b437b245aae86}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...proof, action: "proof-of-humanity" }),
    });

    const verifyResJson = await verifyRes.json(); // Parse JSON response

    if (verifyRes.ok) {
      // Verification succeeded, perform any necessary backend actions here
      // Example: Update user status in your database
      res.status(200).send({
        code: "success",
        detail: "This action verified correctly!",
      });
    } else {
      // Handle errors from the World ID /verify endpoint
      res.status(verifyRes.status).send({
        code: verifyResJson.code,
        detail: verifyResJson.detail,
      });
    }
  } catch (error) {
    // Handle any other errors (e.g., network issues)
    res.status(500).send({ detail: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app;
