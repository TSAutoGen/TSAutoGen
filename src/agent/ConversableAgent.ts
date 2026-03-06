import { Agent, type Message } from './Agent.js';
import { LocalCodeExecutor } from '../runtime/CodeExecutor.js';
import { type LLMProvider, type ChatCompletionMessage } from '../llm/LLMModel.js';

export type HumanInputMode = "ALWAYS" | "NEVER" | "TERMINATE";

export interface ConversableAgentConfig {
    name: string;
    systemMessage?: string;
    llmModel?: LLMProvider | undefined;
    humanInputMode?: HumanInputMode | undefined;
    maxAutoReply?: number | undefined;
    description?: string | undefined;
    codeExecutionConfig?: {
        workDir?: string;
        language?: string;
    } | undefined;
}

export class ConversableAgent extends Agent {
    private systemMessage: string;
    private llmModel: LLMProvider | undefined;
    private humanInputMode: HumanInputMode;
    private maxAutoReply: number;
    private autoReplyCount: number = 0;
    private codeExecutor?: LocalCodeExecutor;

    constructor(config: ConversableAgentConfig) {
        super(config.name);
        this.systemMessage = config.systemMessage || "You are a helpful AI assistant.";
        this.humanInputMode = config.humanInputMode || "NEVER";
        this.maxAutoReply = config.maxAutoReply ?? 10;
        this.llmModel = config.llmModel;

        if (config.codeExecutionConfig) {
            this.codeExecutor = new LocalCodeExecutor(config.codeExecutionConfig.workDir);
        }
    }

    async send(message: string, recipient: Agent, requestReply: boolean = true): Promise<void> {
        this.history.push({ sender: this.name, recipient: recipient.name, content: message, timestamp: Date.now() });
        console.log(`\x1b[32m${this.name} -> ${recipient.name}:\x1b[0m ${message}`);
        await recipient.receive(message, this, requestReply);
    }

    async receive(message: string, sender: Agent, requestReply: boolean = true): Promise<string | void> {
        this.history.push({ sender: sender.name, recipient: this.name, content: message, timestamp: Date.now() });

        if (requestReply && this.autoReplyCount < this.maxAutoReply) {
            const reply = await this.generateReply(message, sender);
            if (reply) {
                this.autoReplyCount++;
                await this.send(reply, sender, false);
                return reply;
            }
        }
    }

    protected async generateReply(message: string, sender: Agent): Promise<string | null> {
        // 1. Code execution check
        if (this.codeExecutor) {
            const codeBlocks = this.extractCode(message);
            if (codeBlocks.length > 0) {
                let executionResults = "";
                for (const block of codeBlocks) {
                    const result = await this.codeExecutor.exec(block.code, block.language);
                    executionResults += `\nExit code: ${result.exitCode}\nOutput: ${result.output}\nError: ${result.error}`;
                }
                return `Code execution results: ${executionResults}`;
            }
        }

        // 2. Human input check (TERMINATE mode logic)
        if (this.humanInputMode === "TERMINATE" && message.includes("TERMINATE")) {
            return null;
        }

        if (this.humanInputMode === "ALWAYS") {
            // CLI interaction placeholder
            return null;
        }

        // 3. LLM Generate
        if (this.llmModel) {
            const messages: ChatCompletionMessage[] = [
                { role: "system", content: this.systemMessage },
                ...this.history.map(m => ({
                    role: (m.sender === this.name ? "assistant" : "user") as "assistant" | "user",
                    content: m.content
                }))
            ];

            const reply = await this.llmModel.generate(messages);
            return reply;
        }

        return null;
    }

    private extractCode(text: string): { language: string, code: string }[] {
        const regex = /```(\w*)\n([\s\S]*?)```/g;
        const blocks: { language: string, code: string }[] = [];
        let match;
        while ((match = regex.exec(text)) !== null) {
            blocks.push({
                language: match[1] || 'python',
                code: match[2] || ""
            });
        }
        return blocks;
    }

    resetReplies(): void {
        this.autoReplyCount = 0;
    }
}
