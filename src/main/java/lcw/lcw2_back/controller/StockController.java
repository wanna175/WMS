package lcw.lcw2_back.controller;


import lcw.lcw2_back.dto.stock.StockDTO;

import lcw.lcw2_back.dto.stock.page.PageStockRequestDTO;
import lcw.lcw2_back.dto.stock.page.PageStockResponseDTO;
import lcw.lcw2_back.service.stock.StockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/stock/modify")
    public ResponseEntity<Map<String, Object>> modifyQuantity(
            @RequestBody PageStockRequestDTO pageStockRequestDTO,
            BindingResult bindingResult) {

        log.info("stock modify~~~~~~~~~");

        // 재고 수정 로직
        int result = stockService.modifyQuantity(pageStockRequestDTO);
        log.info("재고 수정 메소드 실행 결과 : " + result);

        // 결과에 따라 적절한 응답 반환
        Map<String, Object> response = new HashMap<>();
        if (result > 0) {
            response.put("status", "success");
            response.put("message", "재고가 성공적으로 수정되었습니다.");
            return ResponseEntity.ok(response); // 200 OK
        } else {
            response.put("status", "error");
            response.put("message", "재고 수정 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }

    }

}