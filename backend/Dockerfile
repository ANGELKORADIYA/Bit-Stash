# Stage 1: Build the application using a Maven image
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy the pom.xml and download dependencies (improves caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the production image using a lightweight JRE image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Expose the default Spring Boot port
EXPOSE 8080

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
