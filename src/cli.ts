import { Command } from 'commander';
import { createGenerateCommand } from './cli/commands/generate';

const program = new Command();

program
  .name('nust')
  .description('CLI for NUST - NestJS-like API controllers for Nuxt')
  .version('1.0.13');

program.addCommand(createGenerateCommand());

program.parse(); 