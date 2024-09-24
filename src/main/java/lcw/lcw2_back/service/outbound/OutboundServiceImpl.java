package lcw.lcw2_back.service.outbound;

import jakarta.transaction.Transactional;
import lcw.lcw2_back.domain.outbound.Outbound;
import lcw.lcw2_back.dto.OutboundDTO;
import lcw.lcw2_back.dto.Page.PageRequestDTO;
import lcw.lcw2_back.dto.Page.PageResponseDTO;
import lcw.lcw2_back.mapper.OutboundMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Log4j2
public class OutboundServiceImpl implements OutboundService {

    private final ModelMapper modelMapper;
    private final OutboundMapper outboundMapper;


    @Override
    public void registerOutbound(OutboundDTO outboundDTO) {

    }

    @Override
    public void registerOutboundItem(OutboundDTO outboundDTO) {

    }

    @Override
    public void modifyApprove(List<Long> outboundIds) {
        outboundMapper.updateApprove(outboundIds);
    }

    @Override
    public void modifyRejected(List<Long> outboundIds) {
        outboundMapper.updateRejected(outboundIds);
    }

    @Override
    public PageResponseDTO<OutboundDTO> getNotDoneList(PageRequestDTO pageRequestDTO) {
        List<Outbound> outboundList =outboundMapper.selectNotDoneList(pageRequestDTO);
        List<OutboundDTO> outboundDTOList = outboundList.stream()
                .map(vo -> modelMapper.map(vo, OutboundDTO.class))
                .collect(Collectors.toList());

        int total = outboundMapper.getCountNotDoneList(pageRequestDTO);

        PageResponseDTO<OutboundDTO> pageResponseDTO = PageResponseDTO.
                <OutboundDTO>withAll().dtoList(outboundDTOList)
                .total(total).pageRequestDTO(pageRequestDTO).build();
        return pageResponseDTO;
    }

    @Override
    public PageResponseDTO<OutboundDTO> getDoneList(PageRequestDTO pageRequestDTO) {
        List<Outbound> outboundList =outboundMapper.selectDoneList(pageRequestDTO);
        List<OutboundDTO> outboundDTOList = outboundList.stream()
                .map(vo -> modelMapper.map(vo, OutboundDTO.class))
                .collect(Collectors.toList());

        int total = outboundMapper.getCountNotDoneList(pageRequestDTO);

        PageResponseDTO<OutboundDTO> pageResponseDTO = PageResponseDTO.
                <OutboundDTO>withAll().dtoList(outboundDTOList)
                .total(total).pageRequestDTO(pageRequestDTO).build();
        return pageResponseDTO;
    }
}
