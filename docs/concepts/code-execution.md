# Code Execution

One of the most powerful features of TSAutoGen is the ability for agents to execute code autonomously. This allows them to verify their own solutions, process data, and perform complex calculations.

## How it Works

When an agent receives a message containing code blocks (like Python or JavaScript), it can be configured to "extract" and "execute" those blocks locally.

### The CodeExecutor

TSAutoGen uses a `LocalCodeExecutor` to handle runtimes. Currently supported:
- **Python**: Requires `python` installed on the system path.
- **Node.js/TypeScript**: Executed using the current environment.

## Enabling Code Execution

To enable an agent to execute code, provide a `codeExecutionConfig`:

```typescript
const user_proxy = new UserProxyAgent({
    name: "UserProxy",
    codeExecutionConfig: {
        workDir: "coding", // Directory where scripts will be saved and run
        language: "python" // Default language
    }
});
```

## Security Warning ⚠️

Executing agent-generated code has inherent risks.
- **Sandbox Requirement**: In production environments, always use a sandboxed environment (Docker, VM).
- **Permissions**: Run the process with the minimum necessary privileges.
- **Sensitive Data**: Avoid exposing sensitive internal APIs or files to the execution environment.

---

Next: [API Reference](../api-reference/agent-api.md)
