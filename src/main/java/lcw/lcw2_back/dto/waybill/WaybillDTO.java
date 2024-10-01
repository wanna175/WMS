package lcw.lcw2_back.dto.waybill;

import lcw.lcw2_back.domain.inbound.InboundItem;
import lcw.lcw2_back.domain.outbound.OutboundItem;
import lcw.lcw2_back.dto.inbound.InboundItemDTO;
import lcw.lcw2_back.dto.outbound.OutboundItemDTO;
import lombok.*;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@ToString
public class WaybillDTO {

    private Long waybillId;
    private Long outboundId;
    private Long inboundId;
    private Date createdDate;
    private String departAddress;
    private String arriveAddress;
    private String departAddressDetail;
    private String arriveAddressDetail;
    private Long departZipcode;
    private Long arriveZipcode;
    private String departStorageName;
    private String arriveStorageName;

    private List<OutboundItemDTO> outboundItemList;
    private List<InboundItemDTO> inboundItemList;
}
