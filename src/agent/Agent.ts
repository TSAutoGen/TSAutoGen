export interface Message {
    sender: string;
    recipient?: string;
    content: string;
    timestamp?: number;
    metadata?: Record<string, any>;
}

export abstract class Agent {
    public readonly name: string;
    protected history: Message[] = [];

    constructor(name: string) {
        this.name = name;
    }

    abstract send(message: string, recipient: Agent, requestReply?: boolean): Promise<void>;
    abstract receive(message: string, sender: Agent, requestReply?: boolean): Promise<string | void>;

    getChatHistory(): Message[] {
        return this.history;
    }

    clearHistory(): void {
        this.history = [];
    }
}
