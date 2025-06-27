/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            useESM: false,  // MUITO IMPORTANTE para CommonJS
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
