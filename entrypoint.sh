#!/bin/bash

# Start the npm server
echo "Starting npm server..."
cd /app/Frontend
npm start &

# Store the PID of the npm server process
NPM_PID=$!

# Start the Java JAR file
echo "Starting Java JAR..."
cd /app/Backend/target
java -jar social-0.0.1-SNAPSHOT.jar &

# Store the PID of the Java JAR process
JAR_PID=$!

# Function to handle Ctrl+C
ctrl_c() {
    echo "Stopping servers..."

    # Kill the npm server process
    kill $NPM_PID

    # Kill the Java JAR process
    kill $JAR_PID

    exit
}

# Register the Ctrl+C handler
trap ctrl_c INT

# Wait for Ctrl+C to be pressed
while true; do
    sleep 1
done
