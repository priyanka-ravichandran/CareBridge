FROM eclipse-temurin:21-jdk-alpine
WORKDIR /tmp
COPY target/Backend-0.0.1-SNAPSHOT.jar /tmp/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]