import { ConversableAgent, type ConversableAgentConfig } from './ConversableAgent.js';
import { type GroupChat } from './GroupChat.js';
import { type Agent } from './Agent.js';

export interface GroupChatManagerConfig extends ConversableAgentConfig {
    groupChat: GroupChat;
}

export class GroupChatManager extends ConversableAgent {
    private groupChat: GroupChat;

    constructor(config: GroupChatManagerConfig) {
        super(config);
        this.groupChat = config.groupChat;
    }

    async run(initialMessage: string, sender: Agent): Promise<void> {
        let currentSpeaker = sender;
        let message = initialMessage;

        for (let i = 0; i < this.groupChat.maxRound; i++) {
            console.log(`\n\x1b[35m--- Round ${i + 1} ---\x1b[0m`);

            // Record message in group chat
            this.groupChat.messages.push({
                sender: currentSpeaker.name,
                content: message,
                timestamp: Date.now()
            });

            // Select next speaker
            const nextSpeaker = await this.groupChat.selectNextSpeaker(currentSpeaker);

            // Get reply from next speaker
            // We use receive with requestReply=true to get a response
            const reply = await nextSpeaker.receive(message, currentSpeaker, true);

            if (typeof reply === "string") {
                message = reply;
            } else {
                // If it's void, we need to check the sender's history or similar
                // For simplicity in this TS version, let's assume agents return their reply content if they were asked
                // Actually our current ConversableAgent doesn't return the reply string from receive.
                // Let's modify ConversableAgent to return the reply.

                // For now, let's just get the last message from the nextSpeaker's history
                const history = nextSpeaker.getChatHistory();
                message = history[history.length - 1]?.content || "";
            }

            currentSpeaker = nextSpeaker;

            if (message.includes("TERMINATE")) {
                console.log("\x1b[31mTermination signal received.\x1b[0m");
                break;
            }
        }
    }
}
