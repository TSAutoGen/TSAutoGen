import { AssistantAgent } from '../src/agent/AssistantAgent.js';
import { UserProxyAgent } from '../src/agent/UserProxyAgent.js';
import { GroupChat } from '../src/agent/GroupChat.js';
import { GroupChatManager } from '../src/agent/GroupChatManager.js';
import { OpenAIModel } from '../src/llm/OpenAIModel.js';
import dotenv from 'dotenv';

dotenv.config();

const llmModel = new OpenAIModel({
    model: "gpt-4o",
    apiKey: process.env.OPENAI_API_KEY
});

const coder = new AssistantAgent({
    llmModel,
    name: "Coder",
    systemMessage: "You are a coder. You write clean, efficient TypeScript code."
});

const reviewer = new AssistantAgent({
    llmModel,
    name: "Reviewer",
    systemMessage: "You are a code reviewer. You find potential bugs and suggest improvements."
});

const user_proxy = new UserProxyAgent({
    name: "User",
    humanInputMode: "NEVER",
    maxAutoReply: 5
});

const groupchat = new GroupChat({
    agents: [user_proxy, coder, reviewer],
    messages: [],
    maxRound: 10
});

const manager = new GroupChatManager({
    name: "Manager",
    groupChat: groupchat,
    llmModel
});

(async () => {
    console.log("--- TSAutoGen Group Chat Example ---");
    await manager.run("Help me design a simple Todo app architecture in TypeScript.", user_proxy);
})();
