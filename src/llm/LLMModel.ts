export interface ChatCompletionMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface LLMConfig {
    apiKey?: string | undefined;
    model: string;
    temperature?: number | undefined;
    maxTokens?: number | undefined;
}

export interface LLMProvider {
    generate(messages: ChatCompletionMessage[]): Promise<string>;
}
