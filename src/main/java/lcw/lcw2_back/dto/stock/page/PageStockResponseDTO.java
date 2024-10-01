package lcw.lcw2_back.dto.stock.page;

import lcw.lcw2_back.domain.ListVO;
import lcw.lcw2_back.domain.storage.Storage;
import lcw.lcw2_back.dto.StorageDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class PageStockResponseDTO<E> {

    private int page;
    private int size;
    private int total;

    //시작 페이지 번호
    private int start;
    //끝 페이지 번호
    private int end;

    //이전 페이지의 존재 여부
    private boolean prev;
    //다음 페이지의 존재 여부
    private boolean next;

    private List<E> dtoList;

    //검색 조건 select에 담길 값
    private List<StorageDTO> storageDTOList;
    private List<ListVO> productList;

    @Builder(builderMethodName = "withAll")
    public PageStockResponseDTO(PageStockRequestDTO pageStockRequestDTO, List<E> dtoList, int total, List<StorageDTO> storageDTOList, List<ListVO> productList ) {

        if (total <= 0) {
            return;
        }

        this.storageDTOList = storageDTOList;
        this.productList = productList;

        this.page = pageStockRequestDTO.getPage();
        this.size = pageStockRequestDTO.getSize();

        this.total = total;
        this.dtoList = dtoList;

        this.end = (int) (Math.ceil(this.page / 10.0)) * 10;

        this.start = this.end - 9;

        int last = (int) (Math.ceil((total / (double) size)));

        this.end = end > last ? last : end;

        this.prev = this.start > 1;

        this.next = total > this.end * this.size;

    }
}