# CI/CD Workflows Documentation

This document provides an overview of the Continuous Integration and Continuous Deployment (CI/CD) workflows implemented in this project.

## Overview

The project implements a robust CI/CD pipeline using GitHub Actions, focusing on end-to-end testing, test reporting, and automated deployments. The workflows are designed to ensure code quality and provide comprehensive test coverage reporting.

## Pipeline Architecture

```mermaid
graph TD
    A[Push/PR to main] --> B[E2E Tests]
    A --> C[Reports Generation]
    B --> D[Test Execution]
    D --> E[Report Generation]
    E --> F[Artifact Upload]
    C --> G[Documentation]
    C --> H[Playwright Reports]
    C --> I[Allure Reports]
    F --> J[GitHub Pages Deployment]
    G --> J
    H --> J
    I --> J
```

## Workflows

### 1. E2E Tests (`e2e-tests.yml`)

```mermaid
sequenceDiagram
    participant G as GitHub
    participant W as Workflow
    participant T as Test Runner
    participant R as Report Generator
    participant A as Artifact Storage
    
    G->>W: Trigger on push/PR
    W->>T: Setup Node.js 20
    T->>T: Install dependencies
    T->>T: Install Playwright
    T->>T: Run E2E tests
    T->>R: Generate reports
    R->>A: Upload artifacts
    R->>A: Update coverage badge
    A->>G: Deploy to Pages
```

**Purpose**: Runs end-to-end tests and generates test reports.

**Triggers**:
- Push to main branch
- Pull requests to main branch

**Key Features**:
- Runs on Ubuntu latest
- Uses Node.js 20
- Installs Playwright browsers and dependencies
- Executes E2E tests
- Generates Allure and Playwright reports
- Uploads test artifacts
- Generates and updates test coverage badge
- Deploys reports to GitHub Pages

### 2. Reports Generation (`reports.yml`)

```mermaid
graph LR
    A[Trigger] --> B[Setup]
    B --> C[Generate Reports]
    C --> D[Playwright Reports]
    C --> E[Allure Reports]
    C --> F[Documentation]
    D --> G[Deploy]
    E --> G
    F --> G
```

**Purpose**: Generates and deploys test reports to GitHub Pages.

**Triggers**:
- Push to main branch
- Manual trigger (workflow_dispatch)

**Key Features**:
- Generates multiple types of reports:
  - Playwright test reports
  - Allure reports
  - Documentation index page
- Deploys reports to different GitHub Pages directories:
  - Playwright reports: `/playwright`
  - Allure reports: `/allure`
  - Documentation: root directory

### 3. Playwright Report Deployment (`playwright-gh-pages.yml`)

```mermaid
flowchart TD
    A[Trigger] --> B[Run Tests]
    B --> C[Build Report]
    C --> D[Deploy to Pages]
    D --> E[Verify Deployment]
```

**Purpose**: Specifically handles the deployment of Playwright test reports.

**Triggers**:
- Push to main branch

**Key Features**:
- Runs Playwright tests
- Builds Playwright report
- Deploys report to GitHub Pages

### 4. Allure Report Publishing (`allure-report.yml` and `allure-gh-pages.yml`)

```mermaid
sequenceDiagram
    participant G as GitHub
    participant W as Workflow
    participant T as Test Runner
    participant R as Allure
    participant P as Pages
    
    G->>W: Trigger
    W->>T: Run E2E Tests
    T->>R: Generate Report
    R->>P: Deploy Report
    P->>G: Update Pages
```

**Purpose**: Handles the generation and deployment of Allure test reports.

**Triggers**:
- Push to main branch
- Manual trigger (workflow_dispatch)

**Key Features**:
- Runs E2E tests in CI mode
- Generates Allure reports
- Deploys reports to GitHub Pages

## Artifacts and Reports

```mermaid
graph TD
    A[Test Execution] --> B[Artifacts]
    B --> C[Allure Reports]
    B --> D[Playwright Reports]
    B --> E[Test Results]
    B --> F[Coverage Data]
    C --> G[GitHub Pages]
    D --> G
    E --> G
    F --> G
```

The workflows generate and store several types of artifacts:

1. **Allure Reports**: Comprehensive test reports with detailed test execution information
2. **Playwright Reports**: Visual test execution reports
3. **Test Results**: Raw test execution data
4. **Test Coverage**: Code coverage metrics and badges

## GitHub Pages Deployment

```mermaid
graph LR
    A[Reports] --> B[GitHub Pages]
    B --> C[Playwright Reports]
    B --> D[Allure Reports]
    B --> E[Documentation]
    C --> F[Public URL]
    D --> F
    E --> F
```

All reports are automatically deployed to GitHub Pages:
- Playwright reports: `https://[username].github.io/[repo]/playwright`
- Allure reports: `https://[username].github.io/[repo]/allure`
- Documentation: `https://[username].github.io/[repo]`

## Best Practices

1. **Branch Protection**: Main branch should be protected to ensure all tests pass before merging
2. **Artifact Retention**: Configure appropriate retention periods for artifacts
3. **Environment Variables**: Use GitHub Secrets for sensitive information
4. **Cache Management**: Utilize npm caching for faster builds
5. **Concurrency Control**: Implement concurrency controls for deployments

## Maintenance

- Regularly update Node.js and action versions
- Monitor workflow execution times
- Review and optimize test execution
- Keep dependencies up to date
- Monitor GitHub Pages deployment status

## Troubleshooting

Common issues and solutions:
1. **Failed Tests**: Check test logs and reports for specific failures
2. **Deployment Issues**: Verify GitHub Pages settings and token permissions
3. **Build Failures**: Review dependency installation logs
4. **Report Generation**: Ensure proper configuration of Allure and Playwright

For more detailed information about specific workflows, refer to the individual workflow files in this directory.
