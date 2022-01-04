import {removeScope,getBaseNameOfHumpFormat,getDependencieNames,toStringTag} from "package-tls";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";
import {dirname} from "path"
import pkg from './package.json';
const outputDir = dirname("build/*");

const shareOutput = {
  banner: toStringTag(2)`
/*
${pkg.name}	${pkg.version && "v"+ pkg.version}
author: ${pkg.author}
license: ${pkg.license}
homepage: ${pkg.homepage}
repository: ${pkg.repository}
description: ${pkg.description}
*/
`,

  dir:"./",
  entryFileNames:`${outputDir}/[name].js`
};

const coreConf = {
  input: 'src/index.js',
  external: getDependencieNames(pkg),
  plugins: [
    resolve({
      browser:false,
      extensions: ['.js']
    }),
    json(),
    commonjs(),
  ]
}
export default [
  {
    ...coreConf,
    output: [
      {...shareOutput, format: 'es' },
      {...shareOutput, format: 'cjs' },
      {...shareOutput, format: 'amd' },
      {
        ...shareOutput,
        format: 'umd',
        name: "core",
        plugins: [terser()]
      }
    ]
  }
];
