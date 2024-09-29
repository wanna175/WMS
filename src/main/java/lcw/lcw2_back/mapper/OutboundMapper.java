package lcw.lcw2_back.mapper;

import lcw.lcw2_back.domain.outbound.Outbound;
import lcw.lcw2_back.domain.outbound.OutboundItem;
import lcw.lcw2_back.dto.outbound.page.PageOutboundRequestDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OutboundMapper {
    
    //출고요청서 작성
    void insertOutbound(Outbound outbound);

    //출고요청서 작성할 때 품목 추가
    void insertOutboundItem(OutboundItem outboundItem);

    //출고요청서 전체조회
    List<Outbound> selectOutboundNotDoneList(PageOutboundRequestDTO pageOutboundRequestDTO);

    //출고요청서 전체조회 수
    int getCountOutboundNotDoneList(PageOutboundRequestDTO pageOutboundRequestDTO);
    
    //출고처리목록 전체조회
    List<Outbound> selectOutboundDoneList(PageOutboundRequestDTO pageOutboundRequestDTO);

    //출고처리목록 전체조회 수
    int getCountOutboundDoneList(PageOutboundRequestDTO pageOutboundRequestDTO);

    //출고요청 승인하기
    void updateOutboundApprove(List<Long> outboundIds);

    //출고요청 반려하기
    void updateOutboundRejected(List<Long> outboundIds);

    //출고요청 취소하기
    void updateOutboundDoneRejected(List<Long> outboundIds);

    //출고요청 출고완료 처리
    void updateOutboundCompleteOutbound();
    
    //출고요청 배송완료 처리
    void updateOutboundCompleteInbound();
}
