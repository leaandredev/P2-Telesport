package com.openclassrooms.helloworld.model;

public class HelloWorld {
    private String value = "Hello world !";

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
