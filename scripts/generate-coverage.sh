#!/bin/bash

# Generate unit test coverage
npm run test:unit:coverage

# Generate E2E test coverage
npm run test:e2e:ci

# Combine coverage reports
npx nyc report --reporter=html --reporter=text --reporter=lcov

# Upload coverage to codecov if in CI
if [ "$CI" = "true" ]; then
  npx codecov
fi 