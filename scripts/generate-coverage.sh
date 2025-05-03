#!/bin/bash

# Create test-results directory if it doesn't exist
mkdir -p test-results

# Run tests and generate coverage report
npm run test:e2e:coverage

# Extract coverage percentage and save to file
COVERAGE=$(cat coverage/lcov-report/index.html | grep -oP 'strong.*?(\d+\.\d+)%' | grep -oP '\d+\.\d+')
echo $COVERAGE > test-results/coverage.txt

# Generate coverage badge
curl -o test-results/coverage.svg "https://img.shields.io/badge/coverage-${COVERAGE}%25-brightgreen" 