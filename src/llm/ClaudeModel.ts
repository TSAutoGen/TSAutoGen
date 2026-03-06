import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { type LLMProvider, type LLMConfig, type ChatCompletionMessage } from './LLMModel.js';

dotenv.config();

export class ClaudeModel implements LLMProvider {
    private client: Anthropic;
    private config: LLMConfig;

    constructor(config: LLMConfig) {
        this.config = config;
        this.client = new Anthropic({
            apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
        });
    }

    async generate(messages: ChatCompletionMessage[]): Promise<string> {
        let systemMessage: string | undefined = undefined;
        const formattedMessages: Anthropic.MessageParam[] = [];

        for (const msg of messages) {
            if (msg.role === 'system') {
                systemMessage = (systemMessage ? systemMessage + "\n" : "") + msg.content;
            } else {
                formattedMessages.push({
                    role: msg.role === 'user' ? 'user' : 'assistant',
                    content: msg.content
                });
            }
        }

        const body: Anthropic.MessageCreateParamsNonStreaming = {
            model: this.config.model,
            messages: formattedMessages,
            temperature: this.config.temperature ?? 0.7,
            max_tokens: this.config.maxTokens ?? 1024,
        };

        if (systemMessage) {
            body.system = systemMessage;
        }

        const response = await this.client.messages.create(body);

        const textContent = response.content.find(c => c.type === 'text');
        return textContent?.type === 'text' ? textContent.text : "";
    }
}
