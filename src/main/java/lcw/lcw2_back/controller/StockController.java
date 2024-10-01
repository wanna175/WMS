package lcw.lcw2_back.controller;


import lcw.lcw2_back.dto.stock.StockDTO;

import lcw.lcw2_back.dto.stock.page.PageStockRequestDTO;
import lcw.lcw2_back.dto.stock.page.PageStockResponseDTO;
import lcw.lcw2_back.service.stock.StockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController //HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
@Log4j2
@RequestMapping("/api")
public class StockController {

    private final StockService stockService;

    @GetMapping("/test")
    public String testPage(){
        log.info("test");
        return "test";
    }
    @PostMapping("/stock/list")
    public PageStockResponseDTO<StockDTO> getList(@RequestBody PageStockRequestDTO pageStockRequestDTO, BindingResult bindingResult) {
        log.info("stock list~~~~~~~~~");

        PageStockResponseDTO<StockDTO> savedStocks = stockService.listAll(pageStockRequestDTO);

        if(bindingResult.hasErrors()){
            pageStockRequestDTO = PageStockRequestDTO.builder().build();
        }
        log.info(savedStocks);
        return savedStocks;
    }

    @PutMapping("/stock/modify/{storageId}/{productId}/{quantity}")
    public ResponseEntity<Map<String, String>> modifyQuantity(@PathVariable Long storageId,
                                                                    @PathVariable Long productId,
                                                                    @PathVariable Long quantity,
                                                                    @RequestBody PageStockRequestDTO pageStockRequestDTO,
                                                                    BindingResult bindingResult,
                                                                    RedirectAttributes redirectAttributes) {
        log.info("stock modify~~~~~~~~~");

        int result = stockService.modifyQuantity(storageId,productId, quantity);

        log.info("재고 수정 메소드 실행 결과 : "+result);

        if(bindingResult.hasErrors()){
            pageStockRequestDTO = PageStockRequestDTO.builder().build();
        }
//        redirectAttributes.addAttribute("page", pageStockRequestDTO.getPage());
//        redirectAttributes.addAttribute("size", pageStockRequestDTO.getSize());
        //return "redirect:/api/stock/list";

        Map<String, String> ret = new HashMap<>();
        ret.put("responseURL","http://localhost:3000/wms/inventory");
        ret.put("page", String.valueOf(pageStockRequestDTO.getPage()));//alt + shift + enter를 치면 알아서 감싸짐
        ret.put("size", String.valueOf(pageStockRequestDTO.getSize()));//alt + shift + enter를 치면 알아서 감싸짐
        return ResponseEntity.ok(ret);
    }
}