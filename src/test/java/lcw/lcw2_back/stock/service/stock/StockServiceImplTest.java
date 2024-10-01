//package lcw.lcw2_back.stock.service.stock;
//
//import lcw.lcw2_back.domain.stock.StockVO;
//import lcw.lcw2_back.dto.page.PageRequestDTO;
//import lcw.lcw2_back.dto.page.PageResponseDTO;
//import lcw.lcw2_back.dto.stock.StockDTO;
//import lcw.lcw2_back.mapper.StockMapper;
//import lcw.lcw2_back.service.stock.StockService;
//import org.junit.jupiter.api.Test;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.stream.Stream;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class StockServiceImplTest {
//
//    @Autowired
//    StockService stockService;
//
//    @Test
//    void listAll() {
//
//
//        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(1).size(15)
//                .build();
//
//        PageResponseDTO<StockDTO> pageResponseDTO= stockService.listAll(pageRequestDTO);
//
//        pageResponseDTO.getDtoList().stream()
//                .forEach(r -> {
//                    System.out.println(r+"\n");
//                });
//
//    }
//
//    @Test
//    void modifyQuantity() {
//
//        StockDTO stockDTO = StockDTO.builder().storageId(5L).productId(1L).build();
//        stockService.modifyQuantity(5L, 1L, 45L);
//
//
//    }
//}