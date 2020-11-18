module.exports = {
    useTabs: false,
    tabWidth: 4,
    printWidth: 100,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    trailingComma: 'es5', //'all',
    ignorePath: '.prettierignore',
    endOfLine: 'lf', //'auto',
    vueIndentScriptAndStyle: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,
    arrowParens: 'always',
    insertPragma: false,
    requirePragma: false,
    proseWrap: 'never',
    htmlWhitespaceSensitivity: 'ignore', //'strict',
    rangeStart: 0,
    overrides: [
        {
            files: '*.md',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
