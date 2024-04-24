package com.wbs.technicaltest.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.wbs.technicaltest.api.model", "com.wbs.technicaltest.api.repository"})
public class TechnicalTestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechnicalTestApiApplication.class, args);
	}

}
