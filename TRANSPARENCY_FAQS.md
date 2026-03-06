# TSAutoGen: Responsible AI FAQs

## What is TSAutoGen?
TSAutoGen is a framework for simplifying the orchestration, optimization, and automation of LLM workflows in TypeScript. It offers customizable and conversable agents that leverage the capabilities of advanced LLMs, such as GPT-4, Gemini, and Claude, while addressing their limitations by integrating with humans and tools through automated chat.

## What can TSAutoGen do?
TSAutoGen provides a powerful platform for building complex multi-agent systems by:
*   Defining a set of agents with specialized capabilities and roles (e.g., Coder, Reviewer, Manager).
*   Defining the interaction behavior between agents (e.g., who replies to whom).
*   Executing code autonomously in a local environment to verify solutions.
*   Integrating multiple state-of-the-art LLMs (OpenAI, Google, Anthropic) into a single workflow.

## What are the intended uses of TSAutoGen?
TSAutoGen is designed for researchers and developers to explore multi-agent collaboration. Intended uses include:
*   Building complex LLM workflows (e.g., software engineering tasks, data analysis).
*   Experimenting with agent topologies for specific application domains.
*   Automating code generation and execution with various levels of human involvement.
*   Building multi-agent chat and debate systems.

## What are the limitations and how to minimize them?
As with any LLM-based system, TSAutoGen has limitations:
*   **Prompt Injections**: AI agents can be susceptible to prompt injection attacks. Use `UserProxyAgent` with "TERMINATE" or "ALWAYS" human-input modes for sensitive operations.
*   **Hallucinations**: LLMs might produce incorrect code or information. Use multi-agent review (e.g., a "Reviewer" agent) and automated testing to catch errors.
*   **Code Execution Risks**: Local code execution should be done in a sandboxed or monitored environment. Avoid running agent-generated code with administrator privileges.

## Operational Factors for Responsible Use
*   **Human-in-the-loop**: For high-stakes decisions, always maintain a human observer who can intervene.
*   **Model Configuration**: Use appropriate temperature settings (e.g., 0 for deterministic tasks like coding).
*   **Monitoring**: Keep logs of agent conversations to understand the decision-making process.

---

## Evaluation
TSAutoGen is continuously evaluated on its ability to handle complex reasoning tasks and generate valid, executable code across different LLM providers. We encourage the community to share evaluations and benchmarks conducted with the framework.
