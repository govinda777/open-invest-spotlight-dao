# CI/CD Pipeline Documentation

## Overview

This project implements a Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions. The pipeline ensures code quality through automated testing and provides detailed reports for monitoring and analysis.

## Pipeline Strategy

### Workflow Diagram

```mermaid
graph TD
    A[Code Push/PR] --> B{Trigger}
    B -->|Push to main| C[Unit Tests]
    B -->|PR to main| C
    C --> D[Install Dependencies]
    D --> E[Run Unit Tests]
    E --> F[Upload Coverage]
    F --> G[E2E Tests]
    G --> H[Multi-Browser Testing]
    H --> I[Generate Reports]
    I --> J[Upload Artifacts]
    J --> K[Security Scan]
    K --> L[Performance Test]
    L --> M[Deploy Reports]
```

### Trigger Conditions
- The pipeline runs on:
  - Push to the `main` branch
  - Pull requests targeting the `main` branch

### Workflow Components

1. **Unit Tests Workflow** (`unit-tests`)
   - Runs on Ubuntu latest
   - Node.js version: 20
   - Key steps:
     - Install dependencies with caching
     - Execute unit tests with coverage
     - Upload coverage reports
     - Update coverage badge in README

2. **E2E Tests Workflow** (`e2e-tests`)
   - Runs on Ubuntu latest
   - Multi-browser testing (Chromium, Firefox, WebKit)
   - Key steps:
     - Install dependencies with caching
     - Install Playwright browsers
     - Execute E2E tests across browsers
     - Generate and upload test reports
     - Deploy Allure reports to GitHub Pages

3. **Security and Performance** (`security-performance`)
   - Security scanning with Snyk
   - Dependency vulnerability checking
   - Compliance validation
   - Performance testing with autocannon

## Quality Reports Access

### Report Access Flow

```mermaid
graph LR
    A[Pipeline Execution] --> B[Generate Reports]
    B --> C[Allure Report]
    B --> D[Playwright Report]
    B --> E[Test Coverage]
    B --> F[Performance Metrics]
    C --> G[GitHub Pages]
    D --> H[GitHub Artifacts]
    E --> I[README Badge]
    E --> J[Coverage Report]
    F --> K[Performance Report]
```

### Test Reports

1. **Allure Reports**
   - Access URL: `https://[your-organization].github.io/[repository-name]/`
   - Contains detailed test execution results
   - Includes test history, trends, and failure analysis
   - Updated automatically after each successful pipeline run

2. **Playwright Reports**
   - Available as pipeline artifacts
   - Access through GitHub Actions workflow runs
   - Contains detailed test execution logs and screenshots
   - Separate reports for each browser

3. **Test Coverage**
   - Coverage badge automatically updated in README.md
   - Detailed coverage reports available in pipeline artifacts
   - Historical coverage trends

4. **Performance Reports**
   - Load testing results with autocannon
   - Response time metrics
   - Throughput analysis
   - Error rate monitoring

### Accessing Reports

```mermaid
graph TD
    A[Access Reports] --> B[GitHub Actions]
    A --> C[GitHub Pages]
    B --> D[Download Artifacts]
    D --> E[Allure Report]
    D --> F[Playwright Report]
    D --> G[Test Results]
    D --> H[Performance Data]
    C --> I[Interactive Allure Dashboard]
```

1. **GitHub Actions Interface**
   - Navigate to the "Actions" tab in your repository
   - Select the workflow run you want to inspect
   - Under "Artifacts" section, download:
     - `allure-report`
     - `playwright-report`
     - `test-results`
     - `performance-report`

2. **GitHub Pages**
   - Allure reports are automatically published to GitHub Pages
   - Access through the repository's GitHub Pages URL
   - Provides an interactive interface for test analysis

## Best Practices

1. **Before Creating a Pull Request**
   - Ensure all tests pass locally
   - Run `npm run test:e2e` to verify E2E tests
   - Check test coverage locally
   - Run performance tests locally

2. **After Pipeline Execution**
   - Review Allure reports for test results
   - Check Playwright reports for any visual regressions
   - Monitor test coverage trends
   - Analyze performance metrics

3. **Troubleshooting**
   - If pipeline fails, check the specific job logs
   - Review test artifacts for detailed error information
   - Verify environment setup matches pipeline requirements
   - Check performance thresholds

## Environment Requirements

- Node.js 20
- npm
- Playwright browsers
- GitHub Actions environment
- autocannon (for performance testing)

## Maintenance

- Regularly update dependencies
- Monitor test execution times
- Review and update test coverage thresholds
- Keep documentation up to date with pipeline changes
- Monitor performance metrics and adjust thresholds
