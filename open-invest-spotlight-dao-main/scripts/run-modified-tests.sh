#!/bin/bash

# Obtém os arquivos modificados desde o último commit
MODIFIED_FILES=$(git diff --name-only HEAD)

# Executa testes unitários modificados
UNIT_TEST_FILES=$(echo "$MODIFIED_FILES" | grep -E "\.test\.(ts|tsx)$" | grep -v "e2e")
if [ ! -z "$UNIT_TEST_FILES" ]; then
    echo "Executando testes unitários modificados..."
    echo "$UNIT_TEST_FILES" | xargs -n1 npm run test:unit:file
fi

# Executa testes E2E modificados
E2E_TEST_FILES=$(echo "$MODIFIED_FILES" | grep -E "e2e.*\.(ts|tsx)$")
if [ ! -z "$E2E_TEST_FILES" ]; then
    echo "Executando testes E2E modificados..."
    for file in $E2E_TEST_FILES; do
        npx playwright test "$file" --workers=1 --retries=0
    done
fi

if [ -z "$UNIT_TEST_FILES" ] && [ -z "$E2E_TEST_FILES" ]; then
    echo "Nenhum arquivo de teste foi modificado."
    exit 0
fi 