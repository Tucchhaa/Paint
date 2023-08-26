module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'unused-imports'
    ],
    env: {
        browser: true,
    },
    overrides: [
        {
            files: [
                "src/**/*.ts",
                "src/**/*.tsx"
            ],
            rules: {
                "semi": "error",
                "camelcase": "error",
                "no-var": "error",
                "eqeqeq": "error",
                "quotes": ["error", "single"],
                "jsx-quotes": ["error", 'prefer-single'],

                "no-console": "error",
                "no-debugger": "error",

                "block-spacing": "error",
                "arrow-spacing": "error",
                "object-curly-spacing": ["error", "always"],
                "indent": ["error", 4],

                "comma-dangle": ["error", {
                    "arrays": "always-multiline",
                    "objects": "always-multiline",
                    "exports": "always-multiline",
                    "imports": "always-multiline",
                    "functions": "never",
                }],

                "@typescript-eslint/lines-between-class-members": "error",

                "unused-imports/no-unused-imports": "error",
            },
        }
    ]
};
