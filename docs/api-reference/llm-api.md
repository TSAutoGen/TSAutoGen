# LLM API Reference

This document provides a reference for the LLM providers and configurations in TSAutoGen.

## LLMProvider Interface

The unified interface for all supported LLM backend providers.

### Methods
- `generate(messages: ChatCompletionMessage[]): Promise<string>`: Send a conversation history to the model and receive a generated response.

### Supported Providers

#### OpenAIModel
Connect to OpenAI API (e.g., GPT-4, GPT-4o-mini).

```typescript
import { OpenAIModel } from 'tsautogen/llm';

const model = new OpenAIModel({
  model: "gpt-4o",
  apiKey: process.env.OPENAI_API_KEY
});
```

#### GoogleModel
Connect to Google Gemini API (e.g., Gemini 1.5 Pro).

```typescript
import { GoogleModel } from 'tsautogen/llm';

const model = new GoogleModel({
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY
});
```

#### ClaudeModel
Connect to Anthropic Claude API (e.g., Claude 3.5 Sonnet).

```typescript
import { ClaudeModel } from 'tsautogen/llm';

const model = new ClaudeModel({
  model: "claude-3-5-sonnet-20240620",
  apiKey: process.env.ANTHROPIC_API_KEY
});
```

## LLMConfig

The configuration object used by all providers:

- `apiKey?: string`: (Optional) The API key. (Can be read from .env)
- `model: string`: (Required) The model name.
- `temperature?: number`: (Optional) The sampling temperature (0 to 1).
- `maxTokens?: number`: (Optional) The maximum number of tokens to generate.

---

Next: [Back to Introduction](../introduction.md)
