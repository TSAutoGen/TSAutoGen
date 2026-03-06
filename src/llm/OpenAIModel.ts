import dotenv from 'dotenv';
import OpenAI from 'openai';
import { type LLMProvider, type LLMConfig, type ChatCompletionMessage } from './LLMModel.js';

dotenv.config();

export class OpenAIModel implements LLMProvider {
    private client: OpenAI;
    private config: LLMConfig;

    constructor(config: LLMConfig) {
        this.config = config;
        this.client = new OpenAI({
            apiKey: config.apiKey || process.env.OPENAI_API_KEY,
        });
    }

    async generate(messages: ChatCompletionMessage[]): Promise<string> {
        // OpenAI expects system, user, assistant roles.
        const body: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
            model: this.config.model,
            messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
            temperature: this.config.temperature ?? 0.7,
            max_tokens: this.config.maxTokens ?? null,
        };

        const response = await this.client.chat.completions.create(body);
        return response.choices[0]?.message?.content || "";
    }
}
