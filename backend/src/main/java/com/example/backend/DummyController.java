package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DummyController {

    private final DummyRepository repository;
    private final DummyWebSocketHandler webSocketHandler;

    @GetMapping("/dummy")
    public DummyDto getDummy() {
        return toDto(repository.findAll().getFirst());
    }

    @PostMapping("/dummy")
    public DummyDto updateDummy(@RequestBody DummyDto dto) {
        Dummy dummy = repository.findAll().getFirst();
        dummy.setX(dto.x());
        dummy.setY(dto.y());
        repository.save(dummy);

        DummyDto updated = toDto(dummy);
        webSocketHandler.broadcast(updated);
        return updated;
    }

    private DummyDto toDto(Dummy dummy) {
        return new DummyDto(dummy.getX(), dummy.getY());
    }
}
