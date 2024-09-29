package lcw.lcw2_back.domain.outbound;

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

    private Long outboundId;

    private Long productId;
    private String productName;

    private Long quantity;
}