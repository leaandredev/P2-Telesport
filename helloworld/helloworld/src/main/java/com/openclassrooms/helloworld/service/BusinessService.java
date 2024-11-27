package com.openclassrooms.helloworld.service;

import org.springframework.stereotype.Component;

import com.openclassrooms.helloworld.model.HelloWorld;

@Component
public class BusinessService {
    public HelloWorld getHelloWorld() {
        return new HelloWorld();
    }
}
