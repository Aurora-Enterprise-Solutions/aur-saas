const esModules = [ '@aurora-enterprise-solutions' ].join('|')

module.exports = {
    modulePaths: [
        '<rootDir>',
    ],

    moduleNameMapper: {
        '^@/(.*)$' : '<rootDir>/src/$1',
        '^~/(.*)$' : '<rootDir>/src/$1',
        '^vue$'    : 'vue/dist/vue.common.js',
    },

    moduleFileExtensions: [
        'ts',
        'js',
        'vue',
        'json',
    ],

    transform: {
        '^.+\\.ts$'    : 'ts-jest',
        '^.+\\.js$'    : 'babel-jest',
        '^.*\\.(vue)$' : 'vue-jest',
    },

    collectCoverage     : true,
    collectCoverageFrom : [
        '<rootDir>/components/**/*.vue',
        '<rootDir>/pages/**/*.vue',
    ],

    setupFiles: [
        'jest-canvas-mock',
        '<rootDir>/test/setup.js',
    ],

    transformIgnorePatterns: [
        `<rootDir>/node_modules/(?!${esModules})`,
    ],
}
