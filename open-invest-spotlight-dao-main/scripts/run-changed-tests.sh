#!/bin/bash

# Obtém os arquivos alterados
CHANGED_FILES=$(git diff --name-only HEAD | grep -E '\.(ts|tsx)$')

# Filtra apenas os arquivos de teste
TEST_FILES=$(echo "$CHANGED_FILES" | grep -E '\.(test|spec)\.(ts|tsx)$')

if [ -z "$TEST_FILES" ]; then
  echo "Nenhum arquivo de teste alterado encontrado."
  exit 0
fi

echo "Executando testes para os seguintes arquivos:"
echo "$TEST_FILES"

# Executa os testes para cada arquivo alterado
for file in $TEST_FILES; do
  echo "Executando testes para $file"
  npm run test:unit:file "$file"
done 