# Quickstart

Get a multi-agent conversation running in less than 5 minutes.

## Your First Two-Agent Conversation

In this example, we create a `UserProxyAgent` (representing you) and an `AssistantAgent` to solve a task.

```typescript
import { AssistantAgent, UserProxyAgent } from 'tsautogen/agent';
import { OpenAIModel } from 'tsautogen/llm';
import dotenv from 'dotenv';

dotenv.config();

// 1. Initialize the LLM
const llmModel = new OpenAIModel({
    model: "gpt-4o",
    temperature: 0.7
});

// 2. Define the Assistant
const assistant = new AssistantAgent({
    name: "Assistant",
    llmModel,
    systemMessage: "You are a helpful AI assistant."
});

// 3. Define the User Proxy
const user_proxy = new UserProxyAgent({
    name: "User",
    humanInputMode: "NEVER"
});

// 4. Start the conversation
(async () => {
    await user_proxy.send("Explain quantum computing in one sentence.", assistant);
})();
```

## Key Concept: Conversable Agents

Every agent in TSAutoGen is "Conversable". This means they can:
- **Send and Receive Messages**: Keeping track of their own chat history.
- **Generate Replies**: Using an LLM or custom logic.
- **Interact with Humans**: Depending on their `humanInputMode`.

---

Now explore [Core Concepts](../concepts/agents.md) to build more complex systems.
