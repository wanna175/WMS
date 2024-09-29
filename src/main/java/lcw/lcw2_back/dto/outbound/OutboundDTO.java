package lcw.lcw2_back.dto.outbound;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OutboundDTO {
    private Long outboundId;
    private String userId;
    private String status;
    private String arriveName;
    private boolean outboundMart;
    private List<OutboundItemDTO> items;
}

