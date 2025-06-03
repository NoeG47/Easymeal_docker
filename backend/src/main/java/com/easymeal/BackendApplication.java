package com.easymeal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "com.easymeal" })
public class BackendApplication {

	public static void main(String[] args) {
		// Leer variables de entorno del sistema (Docker las pasa)
		String openAiKey = System.getenv("OPENAI_API_KEY");
		String openAiProjectId = System.getenv("OPENAI_PROJECT_ID");

		System.setProperty("OPENAI_API_KEY", openAiKey);
		System.setProperty("OPENAI_PROJECT_ID", openAiProjectId);

		SpringApplication.run(BackendApplication.class, args);
	}

}
