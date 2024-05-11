import { BuildConfig, defineBuildConfig } from 'unbuild';

const rollupConfig: BuildConfig['rollup'] = {
  esbuild: {
    minify: true,
  },
};

export default defineBuildConfig({
  clean: true,
  outDir: 'build',
  declaration: true,
  rollup: rollupConfig,
  entries: ['./src/index'],
});
