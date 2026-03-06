# Security Policy

TSAutoGen takes the security of our users and their data seriously. As an AI-agent framework, we are committed to building a safe and secure tool for the developer community.

## Reporting Security Issues

**Please do not report security vulnerabilities through public GitHub issues.**

If you believe you have found a security vulnerability in the TSAutoGen repository, please report it to us as follows:

1.  **Email**: Send a detailed report to [security@tsautogen.fun](mailto:security@tsautogen.fun).
2.  **MSRC**: For issues specifically related to the underlying Microsoft technologies or AutoGen concepts, you can also report to the Microsoft Security Response Center (MSRC) at [https://msrc.microsoft.com/create-report](https://msrc.microsoft.com/create-report).

When possible, include the following information:
*   Type of issue (e.g. prompt injection, code execution escape, etc.)
*   Full paths of source file(s) related to the manifestation of the issue
*   Any special configuration required to reproduce the issue
*   Step-by-step instructions to reproduce the issue
*   Proof-of-concept or exploit code (if possible)
*   Impact of the issue, including how an attacker might exploit it

## Preferred Languages

We prefer all communications to be in English.

## Policy

TSAutoGen follows the principle of Coordinated Vulnerability Disclosure (CVD).

---

## Secure Coding Practices

We encourage all contributors to follow secure coding practices:
*   Sanitize inputs for code execution.
*   Avoid hardcoding API keys; use environment variables instead.
*   Keep dependencies up to date.
*   Review PRs for potential security pitfalls.
