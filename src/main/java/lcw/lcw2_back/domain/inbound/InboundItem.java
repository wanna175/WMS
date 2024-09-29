package lcw.lcw2_back.domain.inbound;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InboundItem {
    private Long itemId;

    private Long inboundId;

    private Long productId;
    private String productName;

    private Long quantity;
}
