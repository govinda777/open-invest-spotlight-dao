#!/bin/bash

# Run the tests and generate Allure results
npx playwright test

# Generate Allure report
npx allure generate allure-results --clean -o allure-report

# Open the Allure report
npx allure open allure-report 