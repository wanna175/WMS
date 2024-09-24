package lcw.lcw2_back.outbound.service;


import lcw.lcw2_back.dto.OutboundDTO;
import lcw.lcw2_back.dto.Page.PageRequestDTO;
import lcw.lcw2_back.dto.Page.PageResponseDTO;
import lcw.lcw2_back.service.outbound.OutboundService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class OutboundServiceTests {

    @Autowired
    OutboundService outboundService;

    @Test
    public void selectNotDoneList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(10)
                .outboundStorageName("Storage E")
                .build();

        PageResponseDTO<OutboundDTO> list = outboundService.getNotDoneList(pageRequestDTO);
        System.out.println(list);
    }

    @Test
    public void selectDoneList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(15)
                .startDate(LocalDateTime.of(2024,9,6,0,0,0))
                .endDate(LocalDateTime.of(2024,9,10,23,59,59))
                .build();

        PageResponseDTO<OutboundDTO> list = outboundService.getDoneList(pageRequestDTO);
        System.out.println(list);
    }

    @Test
    public void modifyApproveTest() {
        List<Long> outboundIds = new ArrayList<>();
        outboundIds.add(1L);
        outboundIds.add(3L);

        outboundService.modifyApprove(outboundIds);
    }

}
