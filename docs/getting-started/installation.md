# Installation

Installing TSAutoGen is quick and easy. It's designed to run in any modern Node.js environment.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher.
- **npm** or **yarn**.

## Step 1: Install the Package

You can install TSAutoGen directly from npm:

```bash
npm install tsautogen
```

Or using yarn:

```bash
yarn add tsautogen
```

## Step 2: Set Up Environment Variables

TSAutoGen uses environment variables to manage your API keys. Create a `.env` file in your project root:

```env
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_google_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Step 3: Verify Installation

Create a simple test file `test.ts` and run it:

```typescript
import { AssistantAgent } from 'tsautogen/agent';
import { OpenAIModel } from 'tsautogen/llm';

const model = new OpenAIModel({ model: "gpt-4o" });
const assistant = new AssistantAgent({ name: "Assistant", llmModel: model });

console.log("TSAutoGen is ready!");
```

Run it using `ts-node`:

```bash
npx ts-node test.ts
```

---

Next: [Quickstart Guide](./quickstart.md)
