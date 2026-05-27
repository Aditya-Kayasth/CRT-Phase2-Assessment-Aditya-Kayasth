package rcoem06.marketdataservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/market")
public class MarketDataController {

    // A simple endpoint to simulate fetching live NIFTY-50 data
    @GetMapping("/nifty50")
    public Map<String, Object> getNifty50Data() {
        return Map.of(
                "index", "NIFTY 50",
                "currentValue", 22530.50,
                "status", "MARKET_OPEN"
        );
    }
}