package lcw.lcw2_back.service.outbound;

import lcw.lcw2_back.domain.outbound.OutboundItem;
import lcw.lcw2_back.dto.OutboundDTO;
import lcw.lcw2_back.dto.Page.PageRequestDTO;
import lcw.lcw2_back.dto.Page.PageResponseDTO;

import java.util.List;

public interface OutboundService {
    //출고요청서 작성
    void registerOutbound(OutboundDTO outboundDTO);

    //출고요청서 품목 추가
    void registerOutboundItem(OutboundDTO outboundDTO);

    //체크박스에서 체크한 요청 승인 service
    void modifyApprove(List<Long> outboundIds);

    //체크박스에서 체크한 요청 승인 service
    void modifyRejected(List<Long> outboundIds);

    //출고요청서 전체 조회
    PageResponseDTO<OutboundDTO> getNotDoneList(PageRequestDTO pageRequestDTO);

    //출고목록(처리) 전체 조회
    PageResponseDTO<OutboundDTO> getDoneList(PageRequestDTO pageRequestDTO);
}
