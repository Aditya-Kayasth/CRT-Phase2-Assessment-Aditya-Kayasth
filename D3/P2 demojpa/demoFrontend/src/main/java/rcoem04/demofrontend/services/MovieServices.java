package rcoem04.demofrontend.services;

import rcoem04.demofrontend.exception.ResourceNotFoundException;
import rcoem04.demofrontend.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rcoem04.demofrontend.repository.MoviesRepo;

import java.util.List;

@Service
public class MovieServices {

    @Autowired
    private MoviesRepo repository;

    public Movie save(Movie obj){
        return repository.save(obj);
    }

    public List<Movie> getAll(){
        return repository.findAll();
    }

    // Now throws the exception if not found!
    public Movie getById(long id){
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Movie not found with id: " + id));
    }

    // Finds the movie, updates the fields, and saves it
    public Movie update(long id, Movie movieDetails) {
        Movie existingMovie = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Movie not found with id: " + id));

        existingMovie.setMoviename(movieDetails.getMoviename());
        existingMovie.setDirectorname(movieDetails.getDirectorname());
        existingMovie.setRating(movieDetails.getRating());

        return repository.save(existingMovie);
    }

    // Throws exception if trying to delete a non-existent movie
    public String delete(long id){
        Movie existingMovie = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Movie not found with id: " + id));

        repository.delete(existingMovie);
        return "Deleted Successfully";
    }
}