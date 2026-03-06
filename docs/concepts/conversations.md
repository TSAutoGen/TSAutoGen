# Conversations

Conversations are the primary way agents interact and collaborate in TSAutoGen. A conversation is a sequence of messages exchanged between two or more agents to achieve a goal.

## One-on-One Conversations

The simplest form of interaction is between two agents, typically a `UserProxyAgent` and an `AssistantAgent`.

```typescript
await user_proxy.send("Can you write a hello world script?", assistant);
```

When an agent sends a message:
1. The message is added to the sender's history.
2. The message is "received" by the target agent.
3. The target agent processes the message and generates a reply.
4. The cycle continues until a termination condition is met or `maxAutoReply` is reached.

## Group Chats

For more complex tasks, you can use `GroupChat`, which allows multiple agents to work together in a single shared environment.

### The GroupChat Object
`GroupChat` maintains the global state and history for all participating agents.

```typescript
const groupchat = new GroupChat({
    agents: [user_proxy, coder, reviewer],
    messages: [],
    maxRound: 10
});
```

### The GroupChatManager
The `GroupChatManager` is a special agent that orchestrates the conversation flow within a group chat. It is responsible for:
- Collecting messages from agents.
- Deciding which agent should speak next (e.g., Round Robin).
- Broadcasting messages to all participants.

```typescript
const manager = new GroupChatManager({
    groupChat: groupchat,
    llmModel: managerModel
});

await user_proxy.initiateChat(manager, "Design a new web app architecture.");
```

## Chat History

Every `ConversableAgent` maintains its own local `history`. This history is used as context when generating the next reply. 

- **Context Window**: Be mindful of the LLM's token limits. Future versions of TSAutoGen will include automatic history truncation and summarization.
- **Consistency**: In a `GroupChat`, the `GroupChatManager` ensures that all agents have a consistent view of the conversation history.

## Termination Conditions

A conversation ends when:
1. An agent sends a message containing a termination signal (usually the word `TERMINATE`).
2. The `maxAutoReply` limit is reached for an agent.
3. The `maxRound` limit is reached in a `GroupChat`.
4. A human user manually stops the process (in `ALWAYS` input mode).

---

Next: [Code Execution](./code-execution.md)
