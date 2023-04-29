const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
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
                "functions": "never"
            }],
        },
        plugins: {
            typescriptPlugin
        },
        languageOptions: {
            parser: typescriptParser
        }
    }
]