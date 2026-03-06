import { ConversableAgent, type ConversableAgentConfig } from './ConversableAgent.js';

export class UserProxyAgent extends ConversableAgent {
    constructor(config: ConversableAgentConfig) {
        super({
            ...config,
            systemMessage: config.systemMessage || "You are a human proxy. You should not suggest solutions yourself. Instead, pass the task to other agents or report task completion.",
            humanInputMode: config.humanInputMode || "TERMINATE",
        });
    }
}
