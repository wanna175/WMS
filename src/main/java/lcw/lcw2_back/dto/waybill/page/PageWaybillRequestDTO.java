package lcw.lcw2_back.dto.waybill.page;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageWaybillRequestDTO {
    @Builder.Default
    @Min(1)
    private int page = 1;

    @Builder.Default
    private int size = 15;


    /**프론트 입력값들(검색조건)**/
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String arriveStorageName;
    private String departStorageName;
    private Long waybillId;
    private boolean status;//0:false 배송중, 1:true 배송완료
    private String departAddress;
    private String arriveAddress;
    private String departAddressDetail;
    private String arriveAddressDetail;
    private Long departZipcode;
    private Long arriveZipcode;

    public Pageable getPageable(String...props) {
        return PageRequest.of(this.page -1, this.size, Sort.by(props).descending());
    }

    private String link;

    public String getLink() {

        if(link == null){
            StringBuilder builder = new StringBuilder();

            builder.append("page=" + this.page);

            builder.append("&size=" + this.size);


            link = builder.toString();
        }

        return link;
    }

    public int getSkip(){
        return (page-1)*15;
    }
}
