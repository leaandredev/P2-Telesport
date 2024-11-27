package com.openclassrooms.helloworld;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.openclassrooms.helloworld.service.BusinessService;

@SpringBootApplication
public class HelloworldApplication implements CommandLineRunner {

	@Autowired
	private BusinessService businessService;

	public static void main(String[] args) {
		SpringApplication.run(HelloworldApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println(this.businessService.getHelloWorld());
	}

}
