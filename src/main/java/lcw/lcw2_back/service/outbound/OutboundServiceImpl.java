package lcw.lcw2_back.service.outbound;

import lcw.lcw2_back.domain.outbound.Outbound;
import lcw.lcw2_back.domain.outbound.OutboundItem;
import lcw.lcw2_back.dto.outbound.OutboundDTO;
import lcw.lcw2_back.dto.outbound.OutboundDoneListDTO;
import lcw.lcw2_back.dto.outbound.OutboundItemDTO;
import lcw.lcw2_back.dto.outbound.OutboundNotDoneListDTO;
import lcw.lcw2_back.dto.outbound.page.PageOutboundRequestDTO;
import lcw.lcw2_back.dto.outbound.page.PageOutboundResponseDTO;
import lcw.lcw2_back.mapper.OutboundMapper;
import lombok.extern.log4j.Log4j2;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Log4j2
public class OutboundServiceImpl implements OutboundService {

    private final ModelMapper modelMapper;
    private final OutboundMapper outboundMapper;


    @Override
    @Transactional
    public void registerOutbound(OutboundDTO outboundDTO) {
        // Outbound 등록
        Outbound outbound = modelMapper.map(outboundDTO, Outbound.class);
        outboundMapper.insertOutbound(outbound);

        // 등록된 outboundId를 DTO에 설정
        outboundDTO.setOutboundId(outbound.getOutboundId());

        // 품목들 추가
        List<OutboundItemDTO> items = outboundDTO.getItems();
        for (OutboundItemDTO item : items) {
            item.setOutboundId(outboundDTO.getOutboundId());
            OutboundItem outboundItem = modelMapper.map(item, OutboundItem.class);

            outboundMapper.insertOutboundItem(outboundItem);
        }
    }

    //출고요청 승인
    @Override
    public void modifyOutboundApprove(List<Long> outboundIds) {
        outboundMapper.updateOutboundApprove(outboundIds);
    }


    //출고요청 반려
    @Override
    public void modifyOutboundRejected(List<Long> outboundIds) {
        outboundMapper.updateOutboundRejected(outboundIds);
    }

    @Override
    public void modifyOutboundDoneRejected(List<Long> outboundIds) {
        outboundMapper.updateOutboundDoneRejected(outboundIds);
    }

    //진행상태 출고완료 스케줄링
    //cron 초 - 분 - 시 - 일 - 월 - 요일
    @Override
    @Scheduled(cron = "0 0 16 * * *")
    public void modifyOutboundCompleteOutbound() {
        outboundMapper.updateOutboundCompleteOutbound();
    }

    @Override
    @Scheduled(cron = "0 0 * * * *") //매 시간 정각에 실행
    public void modifyOutboundCompleteInbound() {
        outboundMapper.updateOutboundCompleteInbound();
    }

    //출고요청서 조회
    @Override
    public PageOutboundResponseDTO<OutboundNotDoneListDTO> getOutboundNotDoneList(PageOutboundRequestDTO pageOutboundRequestDTO) {
        List<Outbound> outboundList = outboundMapper.selectOutboundNotDoneList(pageOutboundRequestDTO);
        List<OutboundNotDoneListDTO> outboundDTOList = outboundList.stream()
                .map(vo -> modelMapper.map(vo, OutboundNotDoneListDTO.class))
                .collect(Collectors.toList());

        int total = outboundMapper.getCountOutboundNotDoneList(pageOutboundRequestDTO);

        PageOutboundResponseDTO<OutboundNotDoneListDTO> pageOutboundResponseDTO = PageOutboundResponseDTO.
                <OutboundNotDoneListDTO>withAll().dtoList(outboundDTOList)
                .total(total).pageOutboundRequestDTO(pageOutboundRequestDTO).build();
        return pageOutboundResponseDTO;
    }


    //출고현황 조회
    @Override
    public PageOutboundResponseDTO<OutboundDoneListDTO> getOutboundDoneList(PageOutboundRequestDTO pageOutboundRequestDTO) {
        List<Outbound> outboundList = outboundMapper.selectOutboundDoneList(pageOutboundRequestDTO);
        List<OutboundDoneListDTO> outboundDTOList = outboundList.stream()
                .map(vo -> modelMapper.map(vo, OutboundDoneListDTO.class))
                .collect(Collectors.toList());

        int total = outboundMapper.getCountOutboundDoneList(pageOutboundRequestDTO);

        PageOutboundResponseDTO<OutboundDoneListDTO> pageOutboundResponseDTO = PageOutboundResponseDTO.
                <OutboundDoneListDTO>withAll().dtoList(outboundDTOList)
                .total(total).pageOutboundRequestDTO(pageOutboundRequestDTO).build();
        return pageOutboundResponseDTO;
    }

}
