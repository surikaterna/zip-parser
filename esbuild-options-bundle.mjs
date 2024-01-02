
export const options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: 'linked',
  platform: 'node',
  target: 'node18',
  packages: 'external',
  format: 'cjs',
  metafile: true,
  plugins: [],
  outdir: './lib'
};