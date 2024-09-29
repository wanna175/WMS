package lcw.lcw2_back.domain.inbound;

import lcw.lcw2_back.dto.inbound.InboundItemDTO;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Inbound {

    private Long inboundId;

    private String userId;

    private String status;

    private Long quantity;

    private LocalDate requestDate;

    private LocalDate approvedDate;

    private LocalDate inboundCompleteDate;
    private LocalDate outboundCompleteDate;

    private String departStorageName;
    private String arriveName;
    private Long departStorageId;

    private String products;

    private List<InboundItemDTO> items;
}
