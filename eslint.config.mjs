import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            "dist/",
            "webpack.config.js",
            "**/__tests__/*"
        ],
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
];