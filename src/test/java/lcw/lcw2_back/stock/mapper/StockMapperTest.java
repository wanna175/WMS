package lcw.lcw2_back.stock.mapper;

import lcw.lcw2_back.domain.stock.StockVO;

import lcw.lcw2_back.dto.stock.page.PageStockRequestDTO;
import lcw.lcw2_back.mapper.StockMapper;
import lcw.lcw2_back.service.stock.StockService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class StockMapperTest {

    @Autowired
    StockMapper stockMapper;

    @Test
    void listAll() {

        PageStockRequestDTO pageRequestDTO = PageStockRequestDTO.builder().size(15).page(1).build();
        List<StockVO> list =  stockMapper.listAll(pageRequestDTO);

        Stream.of(list).forEach(r-> System.out.println(r.toString()));
    }

    @Test
    void modifyQuantity() {
        StockVO vo = StockVO.builder().storageId(5L).productId(1L).build();
        stockMapper.modifyQuantity(vo, 35L);

    }
}