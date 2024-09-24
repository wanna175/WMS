package lcw.lcw2_back.domain.outbound;

import lcw.lcw2_back.domain.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OutboundItem {
    private Long itemId;

    private Outbound outbound;  // Outbound와 연관, 필드명은 Outbound 엔티티명과 일치시켜야한다.

    private Product product;  // Product와 연관, 필드명은 Product 엔티티명과 일치시켜야한다.

    private Long quantity;
}