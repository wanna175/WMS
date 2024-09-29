package lcw.lcw2_back.outbound.service;


import lcw.lcw2_back.dto.outbound.OutboundDTO;
import lcw.lcw2_back.dto.outbound.OutboundDoneListDTO;
import lcw.lcw2_back.dto.outbound.OutboundItemDTO;
import lcw.lcw2_back.dto.outbound.OutboundNotDoneListDTO;
import lcw.lcw2_back.dto.outbound.page.PageOutboundRequestDTO;
import lcw.lcw2_back.dto.outbound.page.PageOutboundResponseDTO;
import lcw.lcw2_back.service.outbound.OutboundService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class OutboundServiceTests {

    @Autowired
    OutboundService outboundService;

    @Test
    public void selectOutboundNotDoneList() {
        PageOutboundRequestDTO pageOutboundRequestDTO = PageOutboundRequestDTO.builder()
                .page(1)
                .size(10)
                .outboundMart(true)
                .build();

        PageOutboundResponseDTO<OutboundNotDoneListDTO> list = outboundService.getOutboundNotDoneList(pageOutboundRequestDTO);
        System.out.println(list);
    }

    @Test
    public void selectOutboundDoneList() {
        PageOutboundRequestDTO pageOutboundRequestDTO = PageOutboundRequestDTO.builder()
                .page(1)
                .size(15)
                .outboundMart(true)
                .build();

        PageOutboundResponseDTO<OutboundDoneListDTO> list = outboundService.getOutboundDoneList(pageOutboundRequestDTO);
        System.out.println(list);
    }

    @Test
    public void modifyApproveTest() {
        List<Long> outboundIds = new ArrayList<>();
        outboundIds.add(1L);
        outboundIds.add(3L);

        outboundService.modifyOutboundApprove(outboundIds);
    }

    @Test
    public void registerOutboundTest() {

        // 품목 리스트 생성
        OutboundItemDTO item1 = OutboundItemDTO.builder()
                .productName("감귤")
                .quantity(11L)
                .build();

        OutboundItemDTO item2 = OutboundItemDTO.builder()
                .productName("사과")
                .quantity(66L)
                .build();

        // OutboundDTO 생성 및 품목 추가
        OutboundDTO outboundDTO = OutboundDTO.builder()
                .userId("user3")
                .outboundMart(true)
                .items(Arrays.asList(item1, item2)) // 품목 리스트 설정
                .build();

        // 메서드 호출
        outboundService.registerOutbound(outboundDTO);

    }

}
