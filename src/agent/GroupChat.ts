import { type Agent, type Message } from './Agent.js';

export interface GroupChatConfig {
    agents: Agent[];
    messages: Message[];
    maxRound?: number;
    adminName?: string;
}

export class GroupChat {
    public agents: Agent[];
    public messages: Message[];
    public maxRound: number;
    public adminName: string;

    constructor(config: GroupChatConfig) {
        this.agents = config.agents;
        this.messages = config.messages || [];
        this.maxRound = config.maxRound || 10;
        this.adminName = config.adminName || "Admin";
    }

    reset(): void {
        this.messages = [];
    }

    agentNames(): string[] {
        return this.agents.map(a => a.name);
    }

    getAgent(name: string): Agent | undefined {
        return this.agents.find(a => a.name === name);
    }

    async selectNextSpeaker(lastSpeaker: Agent): Promise<Agent> {
        // Default: Round Robin
        const currentIndex = this.agents.indexOf(lastSpeaker);
        const nextIndex = (currentIndex + 1) % this.agents.length;
        return this.agents[nextIndex]!;
    }
}
