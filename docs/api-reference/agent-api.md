# Agent API Reference

This document provides a detailed reference for the core Agent classes in TSAutoGen.

## Agent

The base abstract class for all agents.

### Properties
- `name: string`: The name of the agent.
- `history: ChatCompletionMessage[]`: The local message history.

### Methods
- `send(message: string, recipient: Agent, requestReply: boolean = true): Promise<void>`: Sends a message to another agent.
- `receive(message: ChatCompletionMessage, sender: Agent, requestReply: boolean = true): Promise<void>`: Receives a message from another agent.

---

## ConversableAgent

Inherits from `Agent`. A more powerful agent that can process messages and generate replies using an LLM.

### Constructor Options
- `name: string`: (Required) Agent name.
- `llmModel?: LLMProvider`: (Optional) The LLM provider (OpenAI, Gemini, Claude).
- `systemMessage?: string`: (Optional) The system instruction for the LLM.
- `humanInputMode?: HumanInputMode`: (Default: `NEVER`) Controls human interaction (ALWAYS, NEVER, TERMINATE).
- `maxAutoReply?: number`: (Default: `10`) Limits the number of automatic responses.
- `codeExecutionConfig?: CodeExecutionConfig`: (Optional) Configuration for local code execution.

### Methods
- `generateReply(messages: ChatCompletionMessage[]): Promise<string>`: Generates a response using the LLM and code executor.
- `initiateChat(recipient: Agent, message: string): Promise<void>`: Starts a conversation with another agent.

---

## AssistantAgent

A specialized `ConversableAgent` with default system messages optimized for being a helpful AI assistant.

---

## UserProxyAgent

A specialized `ConversableAgent` that:
- Acts as a proxy for a human.
- Automatically executes code blocks in received messages by default.
- Often has `humanInputMode` set to `ALWAYS` or `TERMINATE`.

---

Next: [LLM API Reference](./llm-api.md)
