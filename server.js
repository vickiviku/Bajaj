const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const port = 5009;

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

app.post("/bfhl", (req, res, next) =>
{
  try
  {
    const { data } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid "data" format in the request body.');
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));

    // Sort the alphabets to get the highest
    const sortedAlphabets = [...alphabets].sort((a, b) => b.localeCompare(a));
    const highestAlphabet = sortedAlphabets[0] || "";

    const response = 
    {
      is_success: true,
      user_id: "vikram_18122002",
      email: "vc1678@srmist.edu.in",
      roll_number: "RA2011053010051",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: [highestAlphabet],
    };

    res.json(response);
  } catch (error) 
  {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Handle 404 for unmatched routes
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log("Server is listening to port:", port);
});
