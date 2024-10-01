package lcw.lcw2_back.service.stock;

import lcw.lcw2_back.dto.stock.StockDTO;
import lcw.lcw2_back.dto.stock.page.PageStockRequestDTO;
import lcw.lcw2_back.dto.stock.page.PageStockResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface StockService {

    PageStockResponseDTO<StockDTO> listAll(PageStockRequestDTO pageStockRequestDTO);
    int modifyQuantity(Long storageId, Long productId, Long quantity);

}
