package lcw.lcw2_back.dto.waybill.page;


import lcw.lcw2_back.dto.StorageDTO;
import lcw.lcw2_back.dto.inbound.InboundItemDTO;
import lcw.lcw2_back.dto.outbound.OutboundItemDTO;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class PageWaybillResponseDTO<WaybillDTO> {

    private int page;
    private int size;
    private int total;

    //시작 페이지 번호
    private int start;
    //끝 페이지 번호
    private int end;

    //이전 페이지의 존재 여부
    private boolean prev;
    //다음 페이지의 존재 여부
    private boolean next;


    private List<OutboundItemDTO> outboundItemList;//출고 품목
    private List<InboundItemDTO> inboundItemDTOList;//입고 품목
    private List<WaybillDTO> dtoList;

    private List<StorageDTO> storageDTOList;//창고이름들

    @Builder(builderMethodName = "withAll")
    public PageWaybillResponseDTO(PageWaybillRequestDTO pageWaybillRequestDTO, List<WaybillDTO> dtoList, int total, List<OutboundItemDTO> outboundItemList, List<InboundItemDTO> inboundItemDTOList, List<StorageDTO> storageDTOList) {

        if (total <= 0) {
            return;
        }

        this.page = pageWaybillRequestDTO.getPage();
        this.size = pageWaybillRequestDTO.getSize();

        this.total = total;
        this.dtoList = dtoList;
        this.inboundItemDTOList = inboundItemDTOList;
        this.outboundItemList = outboundItemList;
        this.storageDTOList = storageDTOList;

        this.end = (int) (Math.ceil(this.page / 10.0)) * 10;

        this.start = this.end - 9;

        int last = (int) (Math.ceil((total / (double) size)));

        this.end = end > last ? last : end;

        this.prev = this.start > 1;

        this.next = total > this.end * this.size;

    }
}