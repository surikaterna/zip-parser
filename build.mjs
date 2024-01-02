import * as esbuild from 'esbuild';
import { options } from './esbuild-options-bundle.mjs';

/**
 * Bundle script that bundles all the files from the src/index.ts file.
 * If for some reason this script does not work, fall back to the "compile" script that is emulating old babel behaviour.
 */

try {
  await esbuild.build(options);
} catch (e) {
  console.log('---- Build failed ----');
  console.log(e.message);
}