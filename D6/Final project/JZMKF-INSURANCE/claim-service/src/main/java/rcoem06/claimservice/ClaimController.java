package rcoem06.claimservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    @Autowired
    private ClaimRepository repository;
    @GetMapping("/policy/{policyId}")
    public List<Claim> getClaimsByPolicy(@PathVariable Long policyId) {
        return repository.findByPolicyId(policyId);
    }
    @Autowired private RestTemplate restTemplate;

    @DeleteMapping("/{id}")
    public void deleteClaim(@PathVariable Long id) {
        repository.deleteById(id);
    }
    
    @PutMapping("/{id}/status")
    public Claim updateClaimStatus(@PathVariable Long id, @RequestParam String status) {
        Claim claim = repository.findById(id).orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setStatus(status); // e.g., "APPROVED" or "REJECTED"
        return repository.save(claim);
    }

    @PostMapping
    public Claim fileClaim(@RequestBody Claim claim) {
        // Verify Policy exists before filing claim
        String policyUrl = "http://POLICY-SERVICE/api/policies/" + claim.getPolicyId();
        try {
            restTemplate.getForObject(policyUrl, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Policy verification failed! Claim rejected.");
        }
        return repository.save(claim);
    }
}