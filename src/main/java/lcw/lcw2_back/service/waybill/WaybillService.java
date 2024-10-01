package lcw.lcw2_back.service.waybill;


import lcw.lcw2_back.domain.waybill.WaybillVO;
import lcw.lcw2_back.dto.waybill.WaybillDTO;
import lcw.lcw2_back.dto.waybill.page.PageWaybillRequestDTO;
import lcw.lcw2_back.dto.waybill.page.PageWaybillResponseDTO;
import org.springframework.stereotype.Service;


public interface WaybillService {

    PageWaybillResponseDTO<WaybillDTO> listAll(PageWaybillRequestDTO pageStockRequestDTO);
    void modifyWaybill(PageWaybillRequestDTO pageWaybillRequestDTO);
}
