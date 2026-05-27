package rcoem05.demovalidation.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rcoem05.demovalidation.model.User;
import rcoem05.demovalidation.repository.UserRepository;
import rcoem05.demovalidation.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allows your future frontend to connect
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    // Inject both the repository (for login/auth) and the service (for favorites)
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }
    @DeleteMapping("/{userId}/favorites/{cricketerId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Long userId, @PathVariable String cricketerId) {
        User updatedUser = userService.removeFavorite(userId, cricketerId);
        return ResponseEntity.ok(updatedUser);
    }

    // 1. REGISTRATION
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // 2. LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginDetails) {
        Optional<User> existingUser = userRepository.findByUsername(loginDetails.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(loginDetails.getPassword())) {
            return ResponseEntity.ok(existingUser.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    // 3. ADD A FAVORITE
    @PostMapping("/{userId}/favorites/{cricketerId}")
    public ResponseEntity<?> addFavorite(@PathVariable Long userId, @PathVariable String cricketerId) {
        // Calls the service method we fixed earlier!
        User updatedUser = userService.addFavorite(userId, cricketerId);
        return ResponseEntity.ok(updatedUser);
    }

    // 4. GET A USER'S FAVORITES
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<?> getFavorites(@PathVariable Long userId) {
        User user = userService.getUserFavorites(userId);
        return ResponseEntity.ok(user);
    }
}