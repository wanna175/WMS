package lcw.lcw2_back.controller;


import lcw.lcw2_back.dto.stock.page.PageStockResponseDTO;
import lcw.lcw2_back.dto.waybill.WaybillDTO;
import lcw.lcw2_back.dto.waybill.page.PageWaybillRequestDTO;
import lcw.lcw2_back.dto.waybill.page.PageWaybillResponseDTO;
import lcw.lcw2_back.service.waybill.WaybillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RequiredArgsConstructor
@RestController //HTTP Response Body에 객체 데이터를 JSON 형식으로 반환하는 컨트롤러
@Log4j2
@RequestMapping("/api")
public class WaybillController {

    private final WaybillService waybillService;

    @PostMapping("/waybill/list")
    public ResponseEntity<PageWaybillResponseDTO<WaybillDTO>> getList(@RequestBody PageWaybillRequestDTO pageWaybillRequestDTO, BindingResult bindingResult) {
        log.info("waybill list~~~~~~~~~");

        PageWaybillResponseDTO<WaybillDTO> savedStocks = waybillService.listAll(pageWaybillRequestDTO);

        if(bindingResult.hasErrors()){
            pageWaybillRequestDTO = PageWaybillRequestDTO.builder().build();
        }
        return ResponseEntity.ok().body(savedStocks);
    }

    @PutMapping("/waybill/modify/{storageId}/{productId}")
    public String modifyQuantity(@RequestBody PageWaybillRequestDTO pageWaybillRequestDTO,
                                 BindingResult bindingResult,
                                 RedirectAttributes redirectAttributes) {
        log.info("stock modify~~~~~~~~~");

        waybillService.modifyWaybill(pageWaybillRequestDTO);

        if(bindingResult.hasErrors()){
            pageWaybillRequestDTO = PageWaybillRequestDTO.builder().build();
        }
        redirectAttributes.addAttribute("page", pageWaybillRequestDTO.getPage());
        redirectAttributes.addAttribute("size", pageWaybillRequestDTO.getSize());
        return "redirect:/api/stock/list";

    }

}
