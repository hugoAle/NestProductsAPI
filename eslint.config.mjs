import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
    ignores: ['eslint.config.mjs', 'src/**/*.spec.ts','*.js'],
    files: ['src/**/*.ts'],
		rules: {
		 '@typescript-eslint/no-explicit-any': 'off',
     '@typescript-eslint/no-floating-promises': 'off',
     '@typescript-eslint/no-unsafe-assignment': 'off',
     '@typescript-eslint/no-unsafe-member-access': 'off',
     '@typescript-eslint/no-unsafe-return': 'off',

		},
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],
	},
  {
    languageOptions: {
      globals: {
        ...global.node,
        ...global.jest,
      },
      // sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
