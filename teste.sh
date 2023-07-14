#!/bin/bash

# Diretório raiz do projeto (diretório do script)
root_directory="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

# Diretório do backend
backend_directory="${root_directory}/Backend"

# Diretório do frontend
frontend_directory="${root_directory}/Frontend/universe-web/"

compile_backend() {
  echo "Compilando o backend..."
  cd "${backend_directory}"
  # Comando para compilar o backend em Spring Boot
  ./mvnw clean package
}

compile_frontend() {
  echo "Compilando o frontend..."
  cd "${frontend_directory}"
  # Comando para compilar o frontend em Next.js
  npm run build
}

start_servers() {
  echo "Iniciando os servidores..."
  cd "${backend_directory}"
  # Comando para iniciar o servidor do backend em Spring Boot
  java -jar target/social-0.0.1-SNAPSHOT.jar &
  backend_pid=$!
  
  cd "${frontend_directory}"
  # Comando para iniciar o servidor do frontend em Next.js
  npm run start &
  frontend_pid=$!
}

trap cleanup SIGINT

main() {
  compile_backend
  compile_frontend
  start_servers

  # Aguardar até que o processo seja encerrado
  wait
}

main
