package rcoem05.demovalidation.controller;

import org.springframework.web.bind.annotation.*;
import rcoem05.demovalidation.service.CricketerService;

@RestController
@RequestMapping("/api/cricketers")
@CrossOrigin(origins = "*") // Allows your frontend to connect without CORS errors
public class CricketerController {

    private final CricketerService cricketerService;

    public CricketerController(CricketerService cricketerService) {
        this.cricketerService = cricketerService;
    }

    // This ONE smart method handles both normal requests and search requests!
    @GetMapping
    public Object getCricketers(@RequestParam(value = "search", required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return cricketerService.searchCricketers(search);
        }
        return cricketerService.getAllCricketers();
    }

    // Get a specific player's profile
    @GetMapping("/{id}")
    public Object getCricketerProfile(@PathVariable String id) {
        return cricketerService.getCricketerProfile(id);
    }
}