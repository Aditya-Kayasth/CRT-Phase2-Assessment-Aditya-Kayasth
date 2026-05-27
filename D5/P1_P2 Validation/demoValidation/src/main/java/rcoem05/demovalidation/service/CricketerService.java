package rcoem05.demovalidation.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CricketerService {
    private final RestTemplate restTemplate;

    @Value("${cricapi.key}")
    private String apiKey;

    // The exact base URL from your screenshot
    private final String BASE_URL = "https://api.cricapi.com/v1";

    public CricketerService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // 1. Get the master list of all players
    public Object getAllCricketers() {
        // Constructs: https://api.cricapi.com/v1/players?apikey=YOUR_KEY&offset=0
        String url = BASE_URL + "/players?apikey=" + apiKey + "&offset=0";
        return restTemplate.getForObject(url, Object.class);
    }

    // 2. Get detailed stats for one player (Matches your screenshot exactly!)
    public Object getCricketerProfile(String cricketerId) {
        // Constructs: https://api.cricapi.com/v1/players_info?apikey=YOUR_KEY&id=SPECIFIC_ID
        String url = BASE_URL + "/players_info?apikey=" + apiKey + "&id=" + cricketerId;
        return restTemplate.getForObject(url, Object.class);
    }

    public Object searchCricketers(String searchTerm) {
        // Constructs: https://api.cricapi.com/v1/players?apikey=YOUR_KEY&offset=0&search=VALUE
        String url = BASE_URL + "/players?apikey=" + apiKey + "&offset=0&search=" + searchTerm;
        return restTemplate.getForObject(url, Object.class);
    }
}