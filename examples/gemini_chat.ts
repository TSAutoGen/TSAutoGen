import { AssistantAgent } from '../src/agent/AssistantAgent.js';
import { UserProxyAgent } from '../src/agent/UserProxyAgent.js';
import { GoogleModel } from '../src/llm/GoogleModel.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Make sure to set GOOGLE_API_KEY in your .env file
 * Get it from https://aistudio.google.com/app/apikey
 */

if (!process.env.GOOGLE_API_KEY) {
    console.error("Please set GOOGLE_API_KEY in your .env file.");
    process.exit(1);
}

const assistant = new AssistantAgent({
    name: "GeminiAssistant",
    llmModel: new GoogleModel({
        model: "gemini-1.5-flash",
        temperature: 0.2
    }),
    systemMessage: "You are a helpful AI assistant powered by Google Gemini. Provide concise answers."
});

const user_proxy = new UserProxyAgent({
    name: "User",
    humanInputMode: "NEVER",
    maxAutoReply: 3
});

(async () => {
    console.log("--- TSAutoGen Gemini Chat ---");
    await user_proxy.send("What can you do as a multi-agent framework component?", assistant, true);
})();
