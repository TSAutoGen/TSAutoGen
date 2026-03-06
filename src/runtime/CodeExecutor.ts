import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export interface CodeExecutionResult {
    exitCode: number;
    output: string;
    error: string;
}

export class LocalCodeExecutor {
    private workDir: string;

    constructor(workDir: string = './coding') {
        this.workDir = workDir;
    }

    async exec(code: string, language: string = 'python'): Promise<CodeExecutionResult> {
        await fs.mkdir(this.workDir, { recursive: true });

        const fileName = `temp_${Date.now()}.${this.getExtension(language)}`;
        const filePath = path.join(this.workDir, fileName);

        await fs.writeFile(filePath, code);

        let command = '';
        if (language === 'python') {
            command = `python "${filePath}"`;
        } else if (language === 'javascript' || language === 'typescript' || language === 'ts' || language === 'js') {
            command = `node "${filePath}"`;
        } else {
            return { exitCode: 1, output: '', error: `Unsupported language: ${language}` };
        }

        try {
            const { stdout, stderr } = await execAsync(command);
            return { exitCode: 0, output: stdout, error: stderr };
        } catch (error: any) {
            return {
                exitCode: error.code || 1,
                output: error.stdout || '',
                error: error.stderr || error.message || 'Unknown error'
            };
        } finally {
            // Optional: cleanup
            // await fs.unlink(filePath);
        }
    }

    private getExtension(language: string): string {
        switch (language.toLowerCase()) {
            case 'python': return 'py';
            case 'javascript':
            case 'js': return 'js';
            case 'typescript':
            case 'ts': return 'ts';
            default: return 'txt';
        }
    }
}
