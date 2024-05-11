import { defineBuildConfig } from 'unbuild';

defineBuildConfig({
  clean: true,
  entries: ['./src/index'],
  outDir: 'build',
  declaration: true,
  rollup: {
    esbuild: {
      minify: true,
    },
  },
});
