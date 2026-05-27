import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository repo;

    @InjectMocks
    private ProductService productService;

    @Test
    public void testGetById() {
        Long productId = 1L;
        Product sampleProduct = new Product();
        sampleProduct.setId(productId);
        sampleProduct.setName("Laptop");

        when(repo.findById(productId)).thenReturn(Optional.of(sampleProduct));

        Product result = productService.getById(productId);

        assertEquals("Laptop", result.getName(), "The product name should be 'Laptop'");
    }
}
