import { AssistantAgent } from '../src/agent/AssistantAgent.js';
import { UserProxyAgent } from '../src/agent/UserProxyAgent.js';
import { ClaudeModel } from '../src/llm/ClaudeModel.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Make sure to set ANTHROPIC_API_KEY in your .env file
 * Get it from https://console.anthropic.com/
 */

if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Please set ANTHROPIC_API_KEY in your .env file.");
    process.exit(1);
}

const assistant = new AssistantAgent({
    name: "ClaudeAssistant",
    llmModel: new ClaudeModel({
        model: "claude-3-5-sonnet-20240620",
        temperature: 0.1,
        maxTokens: 500
    }),
    systemMessage: "You are a helpful AI assistant powered by Anthropic Claude. Provide concise answers."
});

const user_proxy = new UserProxyAgent({
    name: "User",
    humanInputMode: "NEVER",
    maxAutoReply: 3
});

(async () => {
    console.log("--- TSAutoGen Claude Chat ---");
    await user_proxy.send("Tell me about the TSAutoGen framework architecture.", assistant, true);
})();
