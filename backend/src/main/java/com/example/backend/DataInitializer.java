package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final DummyRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            Dummy dummy = new Dummy();
            dummy.setX(0f);
            dummy.setY(0f);
            repository.save(dummy);
        }
    }
}
