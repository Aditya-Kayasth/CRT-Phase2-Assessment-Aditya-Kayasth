package com.example.rcoem.demorestapi.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.rcoem.demorestapi.model.Product;
import org.springframework.stereotype.Repository;

@Repository
public class ProductRepository {

    // Initialize as a mutable ArrayList
    private final List<Product> list = new ArrayList<>();

    // A constructor runs automatically when Spring creates this Repository bean
    public ProductRepository() {
        // Adding elements directly to the mutable list
        list.add(new Product(1, "product 1", 10, 1000));
        list.add(new Product(2, "product 2", 20, 2000));
        list.add(new Product(3, "product 3", 30, 3000));
    }

    public List<Product> getAllProducts() {
        return list;
    }

    public Product findById(int id){
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId() == id) {
                return list.get(i);
            }
        }
        return null;
    }

    public List<Product> search(String name) {
        return list.stream()
                .filter(x -> x.getName().toLowerCase().startsWith(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Product save(Product p) {
        // No need to create an empty product and map fields manually if p is already a valid object,
        // but keeping your logic safe and ensuring it adds cleanly to the mutable list:
        Product product = new Product(p.getId(), p.getName(), p.getQuantity(), p.getPrice());
        list.add(product);
        return product;
    }

    public void delete(int id) {
        list.removeIf(x -> x.getId() == id);
    }

    public Product update(Product product) {
        int idx = -1;
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId() == product.getId()) {
                idx = i;
                break;
            }
        }

        if (idx != -1) {
            list.set(idx, product);
            return product;
        }
        return null; // Or handle product not found
    }
}