# Use a base image with Java
FROM openjdk:17-jdk-slim

# Set the working directory for the frontend build
WORKDIR /app/Frontend

# Copy frontend package.json and package-lock.json to install dependencies
COPY Frontend/universe-web/package*.json ./

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Install frontend dependencies
RUN npm ci --silent

# Copy the frontend source code
COPY Frontend/universe-web/ .

# Build the frontend
RUN npm run build

# Set the working directory for the backend
WORKDIR /app/Backend

# Copy the backend source code to the container
COPY ./Backend /app/Backend

# Get the build arguments passed during the build command
ARG DATABASE
ARG USER
ARG PASSWORD
ARG CLUSTER

# Make the build arguments accessible during the build command,
# follow the build command format below:
# docker build --build-arg DATABASE=<DATABASE> \
#              --build-arg USER=<USER> \
#              --build-arg PASSWORD=<PASSWORD> \
#              --build-arg CLUSTER=<CLUSTER> \
#              -t meu-container .

# Set environment variables with the build arguments
ENV MONGO_DATABASE=$DATABASE
ENV MONGO_USER=$USER
ENV MONGO_PASSWORD=$PASSWORD
ENV MONGO_CLUSTER=$CLUSTER

# Create a script to generate the .env file
RUN echo "MONGO_DATABASE=\"$MONGO_DATABASE\"" > /app/Backend/src/main/resources/.env && \
    echo "MONGO_USER=\"$MONGO_USER\"" >> /app/Backend/src/main/resources/.env && \
    echo "MONGO_PASSWORD=\"$MONGO_PASSWORD\"" >> /app/Backend/src/main/resources/.env && \
    echo "MONGO_CLUSTER=\"$MONGO_CLUSTER\"" >> /app/Backend/src/main/resources/.env

# Compile the backend
RUN ./mvnw clean package

# Expose the port on which the backend is listening
EXPOSE 8080
EXPOSE 3000

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]
