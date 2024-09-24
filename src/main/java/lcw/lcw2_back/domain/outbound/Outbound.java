package lcw.lcw2_back.domain.outbound;

import lcw.lcw2_back.domain.storage.Storage;
import lcw.lcw2_back.domain.user.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Outbound {

    private Long outboundId;

    private String userId;

    private String status;

    private Long quantity;

    private LocalDateTime requestDate;

    private LocalDateTime approvedDate;

    private LocalDateTime completeDate;

    private String receivingStorageName;

    private boolean outboundMart;

    private String productName;

}
