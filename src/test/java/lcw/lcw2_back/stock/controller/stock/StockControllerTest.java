//package lcw.lcw2_back.stock.controller.stock;
//
//import lcw.lcw2_back.controller.StockController;
//
//import lcw.lcw2_back.dto.stock.StockDTO;
//import lcw.lcw2_back.mapper.StockMapper;
//import lcw.lcw2_back.service.stock.StockService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.validation.BindingResult;
//
//
//@SpringBootTest
//class StockControllerTest {
//
//    @Autowired
//    StockService stockService;
//    @Autowired
//    StockController stockController;
//
//    @Test
//    void getListTest() {
//
//        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
//                .page(1)
//                .size(1)
//                .product_name("Product X")
//                .build();
////
////        PageResponseDTO<StockDTO> savedStocks = stockService.listAll(pageRequestDTO);
////
////        System.err.println(savedStocks.toString());
//
//        BindingResult bindingResult=null;
//
//        stockController.getList(pageRequestDTO, bindingResult);
//
//    }
//
//    @Test
//    void modifyQuantity() {
//        //stockController.modifyQuantity(5L, 1L, 10L,)
//
//    }
//}