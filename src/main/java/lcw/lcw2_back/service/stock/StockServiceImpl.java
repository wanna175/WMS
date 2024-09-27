package lcw.lcw2_back.service.stock;

import lcw.lcw2_back.domain.stock.StockVO;

import lcw.lcw2_back.dto.stock.StockDTO;
import lcw.lcw2_back.dto.stock.page.PageStockRequestDTO;
import lcw.lcw2_back.dto.stock.page.PageStockResponseDTO;
import lcw.lcw2_back.mapper.StockMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class StockServiceImpl implements StockService{

    private final StockMapper stockMapper;
    private final ModelMapper modelMapper;

    @Override
    public PageStockResponseDTO<StockDTO> listAll(PageStockRequestDTO pageStockRequestDTO) {
        List<StockVO> voList = stockMapper.listAll(pageStockRequestDTO);

        List<StockDTO> dtoList = voList.stream().map(vo->modelMapper.map(vo, StockDTO.class)).collect(Collectors.toList());

        int total = stockMapper.getCount(pageStockRequestDTO);

        PageStockResponseDTO<StockDTO> pageStockResponseDTO = PageStockResponseDTO.<StockDTO>withAll()
                .dtoList(dtoList)
                .total(total)
                .pageStockRequestDTO(pageStockRequestDTO)
                .build();
        return pageStockResponseDTO;
    }

    @Override
    public void modifyQuantity(Long storageId, Long productId, Long quantity) {

        Optional<StockVO> optionalStockVO = Optional.ofNullable(stockMapper.findStockById(storageId, productId));

        // 존재하는지 확인
        if (!optionalStockVO.isPresent()) {
            throw new NoSuchElementException("조회되지 않음");
        }
        StockVO stockVO = optionalStockVO.get();
        stockMapper.modifyQuantity(stockVO, quantity);
    }

}
