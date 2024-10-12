import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Initialize Hugging Face Inference with your token
const inference = new HfInference(process.env.HF_TOKEN);

// Endpoint to stream AI chat responses and return JSON
export const textGeneration = async(req, res) =>{
    try {
        const { text } = req.body; // Get 'message' from request body
        if (!text) {
            return res.status(400).json({ error: "Text is required." });
        }

        let responseText = ""; // Accumulate response chunks

        // Stream response chunks from Hugging Face
        for await (const chunk of inference.chatCompletionStream({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [{ role: "user", content: text }],
            max_tokens: 500,
        })) {
            responseText += chunk.choices[0]?.delta?.content || "";
        }

        // Send the accumulated response as JSON
        res.status(200).json({ message: responseText });
    } catch (error) {
        console.error("Error in chat completion:", error);
        res.status(500).json({ error: "An error occurred while generating the response." });
    }
};


