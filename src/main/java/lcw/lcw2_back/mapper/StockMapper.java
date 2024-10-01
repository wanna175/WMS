package lcw.lcw2_back.mapper;

import lcw.lcw2_back.domain.stock.StockVO;

import lcw.lcw2_back.dto.stock.page.PageStockRequestDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import java.util.List;

@Mapper
public interface StockMapper {

    public List<StockVO> listAll(PageStockRequestDTO pageStockRequestDTO);

    public int modifyQuantity(@Param("stockVO")StockVO stockVO, Long quantity);//SQL 쿼리 매핑 시 매개변수에 이름을 지정
    public Integer getCount(PageStockRequestDTO pageStockRequestDTO);

    public StockVO findStockById(Long storageId, Long productId);

}
