module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort', 'import'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/no-shadow': ['error'],
				'no-shadow': 'off',
				'no-undef': 'off',
				'simple-import-sort/imports': 'error',
				'simple-import-sort/exports': 'error',
				'import/first': 'error',
				'import/newline-after-import': 'error',
				'import/no-duplicates': 'error',
				'prefer-const': 0,
				'@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
				'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
				'class-methods-use-this': 'off', // _document.tsx use render method without `this` keyword
				'@typescript-eslint/no-unused-vars': 'off',
				'unused-imports/no-unused-imports': 'error',
				'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
				'react/self-closing-comp': [
					'error',
					{
						component: true,
						html: true,
					},
				],
			},
		},
	],
	extends: [
		'@react-native-community',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
};
