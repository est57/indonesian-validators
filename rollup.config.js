import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            exports: 'named'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm'
        }
    ],
    plugins: [resolve(), terser()]
};