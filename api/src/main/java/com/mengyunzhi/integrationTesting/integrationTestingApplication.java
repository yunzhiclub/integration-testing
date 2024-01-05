package com.mengyunzhi.integrationTesting;

import com.mengyunzhi.integrationTesting.repository.SoftDeleteRepositoryFactoryBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(value = "com.mengyunzhi.integrationTesting",
repositoryBaseClass = SoftDeleteRepositoryFactoryBean.class)
public class integrationTestingApplication {

	public static void main(String[] args) {
		SpringApplication.run(integrationTestingApplication.class, args);
	}

}
