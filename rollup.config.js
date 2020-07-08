import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: "lib/index.ts",
    output: {
        file: 'dist/bundle.js',
        format: "umd",
        name: "AevWebview"
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        resolve(),
        commonjs(),
    ]
}
