import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import path from 'path';
import { GENERATOR_NAME } from './constants';
import { genEnum } from './helpers/genEnum';
import { buildImportsHelper, genModel } from './helpers/genModel';
import { writeFileSafely } from './utils';

const { version } = require('../package.json');

const SingleFileModels = new Set<string>();
const SingleFileEnums = new Set<string>();
const SingleFileImports = new Map<string, Set<string>>();
let counter = 0;

const tryEndWrite = async (options: GeneratorOptions) => {
  try {
    const modelsLength = options.dmmf.datamodel.models.length;
    const enumsLength = options.dmmf.datamodel.enums.length;

    counter += 1;

    if (counter === modelsLength + enumsLength) {
      const result: string[] = [];

      for (const [key, value] of SingleFileImports.entries()) {
        result.unshift(`import {${[...value].join(', ')}} from '${key}'\n`);
      }

      SingleFileEnums.forEach(enums => result.push(enums, '\n'));
      SingleFileModels.forEach(models => result.push(models, '\n'));

      const writeLocation = path.join(options.generator.output?.value!, 'index.ts');

      await writeFileSafely(writeLocation, result.join('\n'));
    }
  } catch (error) {
    logger.log(error);
  }
};

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`);
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    };
  },
  onGenerate: async (options: GeneratorOptions) => {
    options.dmmf.datamodel.enums.forEach(async enumInfo => {
      try {
        const tsEnum = genEnum(enumInfo);

        SingleFileEnums.add(tsEnum);

        await tryEndWrite(options);
      } catch (error) {
        logger.info(error);
      }
    }),
      options.dmmf.datamodel.models.forEach(async modelInfo => {
        try {
          const addImport = buildImportsHelper(SingleFileImports);

          const [imports, model] = genModel(modelInfo);

          // Build Imports
          for (const [key, value] of imports.entries()) {
            value.forEach(textImports => addImport(key, textImports));
          }

          SingleFileModels.add(model);

          await tryEndWrite(options);
        } catch (error) {
          logger.info(error);
        }
      });
  },
});
