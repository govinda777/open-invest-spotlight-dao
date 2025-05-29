#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to display help
show_help() {
    echo -e "${YELLOW}Usage: ./run-e2e-tests.sh [OPTION]${NC}"
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo "  -c, --cypress     Run Cypress tests"
    echo "  -p, --playwright  Run Playwright tests"
    echo "  -a, --all         Run all e2e tests (default)"
    echo "  -u, --ui          Run tests with UI (Cypress only)"
    echo "  -d, --debug       Run tests in debug mode"
    echo "  -r, --report      Show test report"
}

# Default values
RUN_CYPRESS=false
RUN_PLAYWRIGHT=false
UI_MODE=false
DEBUG_MODE=false
SHOW_REPORT=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -c|--cypress)
            RUN_CYPRESS=true
            shift
            ;;
        -p|--playwright)
            RUN_PLAYWRIGHT=true
            shift
            ;;
        -a|--all)
            RUN_CYPRESS=true
            RUN_PLAYWRIGHT=true
            shift
            ;;
        -u|--ui)
            UI_MODE=true
            shift
            ;;
        -d|--debug)
            DEBUG_MODE=true
            shift
            ;;
        -r|--report)
            SHOW_REPORT=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# If no specific test framework is selected, run all
if [ "$RUN_CYPRESS" = false ] && [ "$RUN_PLAYWRIGHT" = false ]; then
    RUN_CYPRESS=true
    RUN_PLAYWRIGHT=true
fi

# Run Cypress tests
if [ "$RUN_CYPRESS" = true ]; then
    echo -e "${GREEN}Running Cypress tests...${NC}"
    if [ "$UI_MODE" = true ]; then
        npm run test:e2e:dev
    elif [ "$DEBUG_MODE" = true ]; then
        npm run test:e2e:debug
    else
        npm run test:e2e
    fi
fi

# Run Playwright tests
if [ "$RUN_PLAYWRIGHT" = true ]; then
    echo -e "${GREEN}Running Playwright tests...${NC}"
    if [ "$UI_MODE" = true ]; then
        npm run test:e2e:ui
    elif [ "$DEBUG_MODE" = true ]; then
        npm run test:e2e:debug
    else
        npm run test:e2e
    fi
fi

# Show report if requested
if [ "$SHOW_REPORT" = true ]; then
    echo -e "${GREEN}Showing test report...${NC}"
    npm run test:e2e:report
fi 