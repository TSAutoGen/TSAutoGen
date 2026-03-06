# Agents

At the heart of TSAutoGen are **Agents**. An agent is an autonomous entity that can process information, use tools, and communicate with other agents.

## Types of Built-in Agents

### AssistantAgent
The `AssistantAgent` is designed to be your primary AI companion. It:
- Uses an LLM to generate responses.
- Can be given a specific "System Message" (Role) to guide its behavior.
- By default, it never asks for human input.

### UserProxyAgent
The `UserProxyAgent` acts as a surrogate for a human user. It:
- Can execute code blocks found in messages.
- Can be configured to ask for human input (`ALWAYS` mode).
- Can terminate the conversation based on specific signals.

## Customizing Agents

You can extend the base `Agent` or `ConversableAgent` class to create your own specialized agents:

```typescript
import { ConversableAgent } from 'tsautogen/agent';

class MyCustomAgent extends ConversableAgent {
    // Custom logic here
}
```

---

Learn about [Agent Conversations](./conversations.md).
