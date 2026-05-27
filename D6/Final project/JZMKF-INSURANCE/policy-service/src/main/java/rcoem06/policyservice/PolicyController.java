package rcoem06.policyservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {
    @Autowired
    private PolicyRepository repository;

    @GetMapping("/customer/{customerId}")
    public List<Policy> getPoliciesByCustomer(@PathVariable Long customerId) {
        return repository.findByCustomerId(customerId);
    }
    @DeleteMapping("/{id}")
    public void deletePolicy(@PathVariable Long id) {
        repository.deleteById(id);
    }
    
    @Autowired private RestTemplate restTemplate;

    @GetMapping("/{id}")
    public Policy getPolicy(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Policy not found"));
    }

    @PostMapping
    public Policy createPolicy(@RequestBody Policy policy) {
        // Synchronous call to Customer Service to verify customer exists
        String customerUrl = "http://CUSTOMER-SERVICE/api/customers/" + policy.getCustomerId();
        try {
            restTemplate.getForObject(customerUrl, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Customer verification failed! Policy not created.");
        }
        return repository.save(policy);
    }
}