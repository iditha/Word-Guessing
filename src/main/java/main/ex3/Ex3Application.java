package main.ex3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Spring Boot application.
 *
 * <p>This class bootstraps the application using Spring Boot's auto-configuration
 * and component scanning capabilities. It scans for components, configurations,
 * and services in the {@code main.ex3} package and its sub-packages.</p>
 *
 * <p>To start the application, call {@link SpringApplication#run(Class, String...)}
 * from the {@code main} method.</p>
 *
 *
 * @author Idit Halevi
 * @version 1.0
 * @since 2025-05-30
 */
@SpringBootApplication
public class Ex3Application {
    /**
     * Main method that launches the Spring Boot application.
     *
     * @param args command-line arguments (optional)
     */
    public static void main(String[] args) {
        SpringApplication.run(Ex3Application.class, args);
    }

}
