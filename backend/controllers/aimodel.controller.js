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


export const imageGeneration = async(req, res) => {
    try {
        const { prompt } = req.body; // Get 'prompt' from request body
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." });
        }
        const data = { "inputs": prompt };
        const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HF_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        res.set('Content-Type', 'image/png'); // Adjust MIME type if necessary
        res.send(Buffer.from(buffer));
    }
    catch(error){
        console.error("Image generator error: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const audioGeneration = async (req, res) => {
    try{
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." });
        }
        const data = { "inputs": prompt };
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/musicgen-small",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
            const result = await response.blob();
            const buffer = await result.arrayBuffer();
            res.set('Content-Type', 'audio/mpeg'); // Use the correct MIME type for audio
            res.send(Buffer.from(buffer));
        }catch(error){
            console.error("Audio generator error: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

export const textToAudioGeneration = async (req, res) => {
        try{
            const { prompt } = req.body;
            if (!prompt) {
                return res.status(400).json({ error: "Prompt is required." });
            }
            const data = { "inputs": prompt };
            const response = await fetch(
                "https://api-inference.huggingface.co/models/facebook/mms-tts-eng",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HF_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            const buffer = await result.arrayBuffer();
            res.set('Content-Type', 'audio/wav'); // Use the correct MIME type for audio
            res.send(Buffer.from(buffer));
        }catch(error){
            console.error("Audio generator error: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    