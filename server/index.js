const axios = require('axios');
const express = require('express');
const cors=require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
var corsOptions={
    origin: '*'
}
app.use(cors(corsOptions));

const API_TOKEN = process.env.API_TOKEN;
const APPLICATION_ID = process.env.APPLICATION_ID;

app.post('/users', async (req, res) => {
    const { userId, nickname, profileUrl, issueAccessToken, sessionTokenExpiresAt, metadata } = req.body;
    const apiUrl = `https://api-${APPLICATION_ID}.sendbird.com/v3/users`;
    const config = {
        headers: {
            'Api-Token': API_TOKEN,
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await axios.post(apiUrl, {
            user_id: userId,
            nickname,
            profile_url: profileUrl,
            issue_access_token: issueAccessToken,
            session_token_expires_at: sessionTokenExpiresAt,
            metadata,
        }, config);

        // Validate the response and send back the appropriate message
        if (response.data) {
            // Assuming successful creation, you might want to customize this part
            res.status(201).json({ message: "User created successfully", user: response.data });
        } else {
            // Handle the case where Sendbird's response is not as expected
            res.status(500).json({ message: "Unexpected response from Sendbird" });
        }
    } catch (error) {
        // Handle errors from the request, including potential issues with the Sendbird API
        console.error("Error creating user:", error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ message: "Error creating user", error: error.response ? error.response.data : error.message });
    }
});

app.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId; // Extract the user_id from the request parameters
    const apiUrl = `https://api-${APPLICATION_ID}.sendbird.com/v3/users/${userId}`;
    const config = {
        headers: {
            'Api-Token': API_TOKEN, // Use your actual Api-Token
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.get(apiUrl, config);

        // Validate the response and send back the appropriate message
        if (response.data) {
            // Assuming successful retrieval, you might want to customize this part
            res.status(200).json({ message: "User retrieved successfully", user: response.data });
        } else {
            // Handle the case where Sendbird's response is not as expected
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        // Handle errors from the request, including potential issues with the Sendbird API
        console.error("Error retrieving user:", error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ message: "Error retrieving user", error: error.response ? error.response.data : error.message });
    }
});

app.get('/users', async (req, res) => {
    const apiUrl = `https://api-${APPLICATION_ID}.sendbird.com/v3/users`;
    const config = {
        headers: {
            'Api-Token': API_TOKEN, // Use your actual Api-Token
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.get(apiUrl, config);

        // Validate the response and send back the appropriate message
        if (response.data && response.data.users) {
            // Assuming successful retrieval, you might want to customize this part
            res.status(200).json({ message: "Users retrieved successfully", users: response.data.users });
        } else {
            // Handle the case where Sendbird's response is not as expected
            res.status(500).json({ message: "Unexpected response from Sendbird" });
        }
    } catch (error) {
        // Handle errors from the request, including potential issues with the Sendbird API
        console.error("Error retrieving users:", error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ message: "Error retrieving users", error: error.response ? error.response.data : error.message });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
