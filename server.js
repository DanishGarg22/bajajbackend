const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";


app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});


app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input format." });
        }

        const numbers = data.filter(item => /^\d+$/.test(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
        const highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }))[0]] : [];

        const response = {
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
