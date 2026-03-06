import { AssistantAgent } from '../src/agent/AssistantAgent.js';
import { UserProxyAgent } from '../src/agent/UserProxyAgent.js';
import { OpenAIModel } from '../src/llm/OpenAIModel.js';
import dotenv from 'dotenv';

dotenv.config();

const assistant = new AssistantAgent({
    name: "assistant",
    llmModel: new OpenAIModel({
        model: "gpt-4o",
        temperature: 0,
        apiKey: process.env.OPENAI_API_KEY
    }),
    systemMessage: "You are a helpful AI assistant. Provide concise and accurate answers."
});

const user_proxy = new UserProxyAgent({
    name: "user_proxy",
    humanInputMode: "NEVER",
    maxAutoReply: 5
});

(async () => {
    console.log("--- TSAutoGen Basic Chat (OpenAI) ---");
    await user_proxy.send("What is the current capital of Indonesia?", assistant, true);
})();
