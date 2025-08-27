module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', [
            'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'release'
        ]],
        'header-max-length': [0, 'always', 1000],
        'body-max-line-length': [0, 'always', Infinity]
    }
};
