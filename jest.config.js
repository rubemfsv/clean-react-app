module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/validation/test/index.ts',
    '!<rootDir>/src/validation/protocols/index.ts',
    '!<rootDir>/src/domain/models/index.ts',
    '!<rootDir>/src/domain/usecases/index.ts',
    '!**/*.d.ts',
    '!**/*.png',
    '!**/*.svg',
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/main/scripts/jestSetup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/main/scripts/assetsTransformer.ts',
    '\\.(css|less)$': '<rootDir>/src/main/scripts/assetsTransformer.ts',
  },
};
