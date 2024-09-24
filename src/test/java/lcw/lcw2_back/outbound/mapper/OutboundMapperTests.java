package lcw.lcw2_back.outbound.mapper;

// import lcw.lcw2_back.domain.outbound.OutboundPK;
import lcw.lcw2_back.domain.outbound.Outbound;
import lcw.lcw2_back.dto.OutboundDTO;
import lcw.lcw2_back.dto.Page.PageRequestDTO;
import lcw.lcw2_back.mapper.OutboundMapper;
        import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class OutboundMapperTests {
    @Autowired
    private OutboundMapper outboundMapper;

    @Test
    public void updateApproveTest() {
        List<Long> ids = new ArrayList<>();
        ids.add(1L);
        ids.add(3L);

        outboundMapper.updateApprove(ids);
    }

    @Test
    public void selectNotDoneList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(15)
                .startDate(LocalDateTime.of(2024,9,1,0,0,0))
                .endDate(LocalDateTime.of(2024,9,11,23,59,59))
                .item("Product X")
                .build();

        List<Outbound> voList = outboundMapper.selectNotDoneList(pageRequestDTO);
        voList.forEach(vo-> System.out.println(vo));
    }

    @Test
    public void getCountNotDoneList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(5)
                .build();

        int total = outboundMapper.getCountNotDoneList(pageRequestDTO);
    }

    @Test
    public void selectDoneListTest() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(1)
                .size(5)
                .item("Product Z")
                .status("DONE")
                .build();

        List<Outbound> voList = outboundMapper.selectDoneList(pageRequestDTO);
        voList.forEach(vo-> System.out.println(vo));

    }
}