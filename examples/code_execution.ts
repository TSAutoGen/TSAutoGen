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
    systemMessage: "You are a helpful AI assistant. Write python code to solve tasks."
});

const user_proxy = new UserProxyAgent({
    name: "user_proxy",
    humanInputMode: "NEVER",
    maxAutoReply: 5,
    codeExecutionConfig: {
        workDir: "coding",
    }
});

(async () => {
    console.log("--- TSAutoGen Code Execution Example ---");
    // The assistant will suggest code, the user_proxy (with codeExecutionConfig) will execute it
    await user_proxy.send("Write a python script to print the first 10 numbers in the Fibonacci sequence.", assistant, true);
})();
