package lcw.lcw2_back.mapper;


import lcw.lcw2_back.domain.inbound.InboundItem;
import lcw.lcw2_back.domain.outbound.OutboundItem;
import lcw.lcw2_back.domain.waybill.WaybillVO;

import lcw.lcw2_back.dto.outbound.OutboundItemDTO;
import lcw.lcw2_back.dto.waybill.page.PageWaybillRequestDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface WaybillMapper {

    public List<WaybillVO> listALl(PageWaybillRequestDTO pageWaybillRequestDTO);

    public void modifyWaybill(@Param("dto") PageWaybillRequestDTO pageWaybillRequestDTO);
    public Integer getCount(@Param("dto")PageWaybillRequestDTO pageWaybillRequestDTO);

    public List<OutboundItem> getItemsByOutboundId(Long outboundId);//출고품목
    public List<InboundItem> getItemsByInboundId(Long outboundId);//입고품목


}
