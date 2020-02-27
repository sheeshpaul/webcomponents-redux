import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify-es';

const extensions = ['.ts'];

export default [
    // IIFE Development
    {
        input: 'src/index.ts',
        output: {
            file: pkg.unpkg,
            name: 'WebComponentsRedux',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve({ extensions }), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            babel({ extensions, include: ['src/**/*'] }), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
        ],
    },

    // IIFE Production
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/webcomponents-redux.min.js',
            name: 'WebComponentsRedux',
            format: 'iife',
            esModule: false,
        },
        plugins: [
            resolve({ extensions }), // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            babel({ extensions, include: ['src/**/*'] }), // Convert TypeScript to JavaScript
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            uglify(),
        ],
    },

    // ES
    {
        input: 'src/index.ts',
        output: { file: pkg.module, format: 'es', indent: false },
        plugins: [
            resolve({ extensions }),
            babel({ extensions, include: ['src/**/*'] }), // Convert TypeScript to JavaScript
        ],
    },

    // CommonJS
    {
        input: 'src/index.ts',
        output: { file: pkg.main, format: 'cjs', indent: false },
        plugins: [
            resolve({ extensions }),
            babel({ extensions, include: ['src/**/*'] }), // Convert TypeScript to JavaScript
        ],
    },
];
