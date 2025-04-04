import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { promises as fs } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildCli() {
  try {
    // Ensure the bin directory exists
    await fs.mkdir(join(__dirname, 'bin'), { recursive: true });

    // Build the CLI
    await build({
      entryPoints: [join(__dirname, 'src/cli.ts')],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outfile: join(__dirname, 'bin/cli.js'),
      format: 'esm',
      external: [
        'commander',
        'node:*',
        'node:events',
        'node:fs',
        'node:path',
        'node:url',
        'node:util',
        'node:process'
      ],
    });

    // Fix shebang in the output file
    const cliPath = join(__dirname, 'bin/cli.js');
    let content = await fs.readFile(cliPath, 'utf-8');
    
    // Remove any existing shebang lines
    content = content.replace(/^#!.*\n/gm, '');
    
    // Add single shebang at the start
    content = `#!/usr/bin/env node\n${content}`;
    
    await fs.writeFile(cliPath, content);

    // Make the file executable
    await fs.chmod(cliPath, 0o755);

    console.log('CLI built successfully');
  } catch (error) {
    console.error('Error building CLI:', error);
    process.exit(1);
  }
}

buildCli();
