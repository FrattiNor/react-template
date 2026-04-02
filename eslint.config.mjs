import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([globalIgnores(['build/', 'dist/', 'node_modules/']), eslint.configs.recommended, tseslint.configs.recommended]);
