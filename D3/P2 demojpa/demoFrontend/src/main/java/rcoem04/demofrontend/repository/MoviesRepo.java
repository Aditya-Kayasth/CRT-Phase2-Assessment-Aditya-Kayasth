package rcoem04.demofrontend.repository;

import rcoem04.demofrontend.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviesRepo extends JpaRepository<Movie,Long> {

}
