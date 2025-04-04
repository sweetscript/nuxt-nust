import { Command } from 'commander';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import {
  generateController,
  generateService,
  generateResource,
  generateEntity,
  generateDto,
} from '../generators';

export function createGenerateCommand(): Command {
  const command = new Command('generate')
    .alias('g')
    .description('Generate a new resource')
    .argument(
      '<type>',
      'Type of resource to generate (controller, service, module, entity, dto, or resource)',
    )
    .argument('<name>', 'Name of the resource')
    .option(
      '-p, --path <path>',
      'Path where the files should be generated',
      'server/nust',
    )
    .option(
      '-t, --dto-type <dtoType>',
      'Type of DTO to generate (create or update)',
      'create',
    )
    .action(
      async (
        type: string,
        name: string,
        options: { path: string; dtoType: 'create' | 'update' },
      ) => {
        const basePath = join(
          process.cwd(),
          options.path,
          name.toLowerCase(),
        );

        // Create the resource directory
        await fs.mkdir(basePath, { recursive: true });

        // Create dto directory
        const dtoPath = join(basePath, 'dto');
        if (type === 'resource' || type === 'dto') {
          await fs.mkdir(dtoPath, { recursive: true });
        }

        // Create entity directory
        const entityPath = join(basePath, 'entity');
        if (type === 'resource' || type === 'entity') {
          await fs.mkdir(entityPath, { recursive: true });
        }

        try {
          if (type === 'resource') {
            const resources = generateResource(name);

            // Generate all files
            await Promise.all([
              fs.writeFile(
                join(basePath, `${name.toLowerCase()}.controller.ts`),
                resources.controller,
              ),
              fs.writeFile(
                join(basePath, `${name.toLowerCase()}.service.ts`),
                resources.service,
              ),
              fs.writeFile(
                join(entityPath, `${name.toLowerCase()}.entity.ts`),
                resources.entity,
              ),
              fs.writeFile(
                join(dtoPath, `Create${name}.dto.ts`),
                resources.createDto,
              ),
              fs.writeFile(
                join(dtoPath, `Update${name}.dto.ts`),
                resources.updateDto,
              ),
            ]);

            // Update index.ts for the new controller
            await updateIndexFile(name, options.path);

            console.log(
              `✅ Generated resource ${name} with all components in ${basePath}`,
            );
            return;
          }

          await fs.mkdir(basePath, { recursive: true });

          let fileName = '';
          let content = '';
          let targetPath = basePath;

          switch (type) {
            case 'controller':
              content = generateController(name);
              fileName = `${name.toLowerCase()}.${type}.ts`;
              // Update index.ts for the new controller
              await updateIndexFile(name, options.path);
              break;
            case 'service':
              content = generateService(name);
              fileName = `${name.toLowerCase()}.${type}.ts`;
              break;
            case 'entity':
              content = generateEntity(name);
              fileName = `${name.toLowerCase()}.entity.ts`;
              targetPath = entityPath;
              break;
            case 'dto':
              content = generateDto(name, options.dtoType);
              fileName = `${options.dtoType === 'create' ? 'Create' : 'Update'}${name}.dto.ts`;
              targetPath = dtoPath;
              break;
            default:
              console.error(`Unsupported resource type: ${type}`);
              process.exit(1);
          }

          const filePath = join(targetPath, fileName);
          await fs.writeFile(filePath, content);
          console.log(`Generated ${type}: ${filePath}`);
        } catch (error) {
          console.error('Error generating resource:', error);
          process.exit(1);
        }
      },
    );

  return command;
}

async function updateIndexFile(name: string, basePath: string) {
  const indexPath = join(process.cwd(), basePath, 'index.ts');
  const controllerName = name.charAt(0).toUpperCase() + name.slice(1);
  const importPath = `~/${basePath}/${name.toLowerCase()}/${name.toLowerCase()}.controller`;

  try {
    let content = await fs.readFile(indexPath, 'utf-8');

    // Add import if it doesn't exist
    if (!content.includes(importPath)) {
      const importLine = `import { ${controllerName}Controller } from '${importPath}';\n`;
      content = content.replace(
        /import type \{ NustControllers \} from '#nust';/,
        `import type { NustControllers } from '#nust';\n${importLine}`,
      );
    }

    // Add to exports if it doesn't exist
    const exportLine = `  ${name.toLowerCase()}: ${controllerName}Controller,\n`;
    if (!content.includes(`${name.toLowerCase()}: ${controllerName}Controller`)) {
      // Find the last closing brace in the exports object
      const lastBraceIndex = content.lastIndexOf('}');
      if (lastBraceIndex !== -1) {
        // Insert the new export line before the last closing brace
        content = content.slice(0, lastBraceIndex) + exportLine + content.slice(lastBraceIndex);
      }
    }

    await fs.writeFile(indexPath, content);
  } catch (error) {
    console.error('Error updating index.ts:', error);
  }
}
