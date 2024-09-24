package lcw.lcw2_back.mapper;

import lcw.lcw2_back.domain.outbound.Outbound;
import lcw.lcw2_back.dto.OutboundDTO;
import lcw.lcw2_back.dto.Page.PageRequestDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OutboundMapper {
    
    //출고요청서 작성
    void insertOutbound(OutboundDTO outboundDTO);

    //출고요청서 작성할 때 품목 추가
    void insertOutboundItem(OutboundDTO outboundDTO);

    //출고요청서 전체조회
    List<Outbound> selectNotDoneList(PageRequestDTO pageRequestDTO);

    //출고요청서 전체조회 수
    int getCountNotDoneList(PageRequestDTO pageRequestDTO);
    
    //출고처리목록 전체조회
    List<Outbound> selectDoneList(PageRequestDTO pageRequestDTO);

    //출고처리목록 전체조회 수
    int getCountDoneList(PageRequestDTO pageRequestDTO);

    //출고요청 승인하기
    void updateApprove(List<Long> outboundIds);

    //출고요청 반려하기
    void updateRejected(List<Long> outboundIds);
}
