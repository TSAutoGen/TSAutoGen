import { ConversableAgent, type ConversableAgentConfig } from './ConversableAgent.js';

export class AssistantAgent extends ConversableAgent {
    constructor(config: ConversableAgentConfig) {
        super({
            ...config,
            systemMessage: config.systemMessage || "You are a helpful AI assistant. Solve tasks using your tools and LLM capabilities.",
            humanInputMode: config.humanInputMode || "NEVER",
        });
    }
}
