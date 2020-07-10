import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from "rollup-plugin-uglify";

let pck = require("./package.json")
const isProd = process.env.NODE_ENV === "production";

export default {
    input: "lib/index.ts",
    output: {
        sourcemap: true,
        file: isProd ? `dist/release.js` : 'dist/bundle.js',
        format: "umd",
        name: "AevWebview"
    },
    plugins: [
        isProd && uglify(),
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
