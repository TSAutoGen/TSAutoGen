import dotenv from 'dotenv';
import { GoogleGenerativeAI, type Content, type ModelParams } from '@google/generative-ai';
import { type LLMProvider, type LLMConfig, type ChatCompletionMessage } from './LLMModel.js';

dotenv.config();

export class GoogleModel implements LLMProvider {
    private client: GoogleGenerativeAI;
    private config: LLMConfig;

    constructor(config: LLMConfig) {
        this.config = config;
        this.client = new GoogleGenerativeAI(config.apiKey || process.env.GOOGLE_API_KEY || "");
    }

    async generate(messages: ChatCompletionMessage[]): Promise<string> {
        let systemMessage: string | undefined = undefined;
        const formattedMessages: Content[] = [];

        for (const msg of messages) {
            if (msg.role === 'system') {
                systemMessage = (systemMessage ? systemMessage + "\n" : "") + msg.content;
            } else {
                formattedMessages.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                });
            }
        }

        const modelParams: ModelParams = {
            model: this.config.model,
        };
        if (systemMessage) {
            modelParams.systemInstruction = systemMessage;
        }

        const model = this.client.getGenerativeModel(modelParams);

        const chat = model.startChat({
            history: formattedMessages.slice(0, -1),
        });

        const lastMsg = formattedMessages[formattedMessages.length - 1];
        if (!lastMsg) return "";

        const result = await chat.sendMessage(lastMsg.parts[0]!.text || "");
        const response = result.response;
        return response.text();
    }
}
