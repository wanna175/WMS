package lcw.lcw2_back.service.waybill;


import lcw.lcw2_back.domain.inbound.InboundItem;
import lcw.lcw2_back.domain.outbound.OutboundItem;
import lcw.lcw2_back.domain.waybill.WaybillVO;

import lcw.lcw2_back.dto.inbound.InboundItemDTO;
import lcw.lcw2_back.dto.outbound.OutboundItemDTO;
import lcw.lcw2_back.dto.waybill.WaybillDTO;
import lcw.lcw2_back.dto.waybill.page.PageWaybillRequestDTO;
import lcw.lcw2_back.dto.waybill.page.PageWaybillResponseDTO;
import lcw.lcw2_back.mapper.WaybillMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Log4j2
@RequiredArgsConstructor
public class WaybillServiceImpl implements WaybillService{

    private final ModelMapper modelMapper;
    private final WaybillMapper waybillMapper;

    @Override
    public PageWaybillResponseDTO<WaybillDTO> listAll(PageWaybillRequestDTO pageWaybillRequestDTO) {

        List<WaybillVO> voList = waybillMapper.listALl(pageWaybillRequestDTO);

        // WaybillVO -> WaybillDTO로 변환 및 OutboundItem 매칭
        List<WaybillDTO> dtoList = voList.stream().map(vo -> {
            // WaybillVO -> WaybillDTO 변환
            WaybillDTO dto = modelMapper.map(vo, WaybillDTO.class);

            // outboundId가 null이 아닌 경우, 해당 OutboundItem 목록을 가져와 dto에 추가
            if (vo.getOutboundId() != null && vo.getInboundId() == null) {
                List<OutboundItem> outboundItems = waybillMapper.getItemsByOutboundId(vo.getOutboundId());

                // OutboundItemVO를 OutboundItemDTO로 변환
                List<OutboundItemDTO> outboundItemDTOList = outboundItems.stream()
                        .map(item -> modelMapper.map(item, OutboundItemDTO.class))
                        .collect(Collectors.toList());

                // 기존 DTO의 필드를 그대로 복사하고, OutboundItems만 추가하여 새로운 DTO를 빌드
                dto = dto.builder()
                        .outboundItemList(outboundItemDTOList)  // 리스트 추가
                        .build();
            }

            // inboundId가 null이 아니고 outboundId가 null인 경우
            if (vo.getInboundId() != null && vo.getOutboundId() == null) {
                List<InboundItem> inboundItems = waybillMapper.getItemsByInboundId(vo.getInboundId());

                // InboundItemVO를 InboundItemDTO로 변환
                List<InboundItemDTO> inboundItemDTOList = inboundItems.stream()
                        .map(item -> modelMapper.map(item, InboundItemDTO.class))
                        .collect(Collectors.toList());

                // 기존 DTO의 필드를 그대로 복사하고, InboundItems만 추가하여 새로운 DTO를 빌드
                dto = dto.builder()
                        .inboundItemList(inboundItemDTOList)  // 리스트 추가
                        .build();
            }

            return dto;
        }).collect(Collectors.toList());



        int total = waybillMapper.getCount(pageWaybillRequestDTO);

        PageWaybillResponseDTO<WaybillDTO> pageWaybillResponseDTO = PageWaybillResponseDTO.<WaybillDTO>withAll()
                .dtoList(dtoList)
                .total(total)
                .pageWaybillRequestDTO(pageWaybillRequestDTO)
                .build();
        return pageWaybillResponseDTO;
    }

    @Override
    public void modifyWaybill(PageWaybillRequestDTO pageWaybillRequestDTO) {
        waybillMapper.modifyWaybill(pageWaybillRequestDTO);

    }
}
