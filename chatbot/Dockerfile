# Stage 1: Build the Spring Boot application
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first to cache them
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Install Tesseract OCR and English model
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    && rm -rf /var/lib/apt/lists/*

# Set up environment variables
ENV TESSERACT_DATA_PATH=/usr/share/tesseract-ocr/5/tessdata
ENV PORT=8080

COPY --from=build /app/target/chatbot-0.0.1-SNAPSHOT.jar app.jar

# Configure JVM for low memory (512MB limit)
# -XX:+UseSerialGC reduces CPU and memory overhead in small containers
# -Xmx256m caps the heap at 256MB, leaving the remaining 256MB for metaspace, stack, off-heap and OS.
ENTRYPOINT ["java", "-XX:+UseSerialGC", "-Xss512k", "-Xmx256m", "-Xms128m", "-Dserver.port=${PORT}", "-jar", "app.jar"]
