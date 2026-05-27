package rcoem04.demofrontend.controller;

import rcoem04.demofrontend.models.Movie;
import rcoem04.demofrontend.services.MovieServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // ALLOWS REACT TO CONNECT!
@RestController
@RequestMapping("/api/movies/v1")
public class MovieController {

    @Autowired
    private MovieServices service;

    @GetMapping("/all")
    public List<Movie> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public Movie create(@RequestBody Movie obj) {
        return service.save(obj);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Movie> getById(@PathVariable Long id) {
        Movie movie = service.getById(id);
        return ResponseEntity.ok(movie);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Movie> update(@PathVariable Long id, @RequestBody Movie details) {
        Movie updatedMovie = service.update(id, details);
        return ResponseEntity.ok(updatedMovie);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        String response = service.delete(id);
        return ResponseEntity.ok(response);
    }
}