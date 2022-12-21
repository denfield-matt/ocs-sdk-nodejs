import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { build } from 'esbuild';

/** @type {import('esbuild').BuildOptions} */
const options = {
    sourcemap: process.env.NODE_ENV === 'development',
    plugins: [nodeExternalsPlugin()],
    entryPoints: ['./src/index.ts'],
    logLevel: 'debug',
    platform: 'node',
    target: 'node16',
    outdir: 'build',
    format: 'esm',
    bundle: true,
    minify: true
};

await build({
    ...options,
    outExtension: { '.js': '.mjs' },
    format: 'esm',
});