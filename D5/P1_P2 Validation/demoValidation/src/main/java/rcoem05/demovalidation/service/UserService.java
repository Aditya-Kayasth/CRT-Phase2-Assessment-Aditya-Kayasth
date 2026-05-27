package rcoem05.demovalidation.service;

import org.springframework.stereotype.Service;
import rcoem05.demovalidation.exception.ResourceNotFoundException;
import rcoem05.demovalidation.model.Favorite; // Make sure to import Favorite
import rcoem05.demovalidation.model.User;
import rcoem05.demovalidation.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public User removeFavorite(Long userId, String cricketerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Remove the favorite that matches the cricketerId
        user.getFavorites().removeIf(fav -> fav.getCricketerId().equals(cricketerId));

        return userRepository.save(user);
    }

    public User addFavorite(Long userId, String cricketerId) {
        // 1. Find the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // 2. Create the new Favorite record
        Favorite favorite = new Favorite();
        favorite.setCricketerId(cricketerId);

        // 3. Link it to the user using the helper method we built in the User model
        user.addFavorite(favorite);

        // 4. Save to MySQL (CascadeType.ALL ensures the favorite is saved to the favorites table too)
        return userRepository.save(user);
    }

    public User getUserFavorites(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}