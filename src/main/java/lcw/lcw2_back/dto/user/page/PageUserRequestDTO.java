package lcw.lcw2_back.dto.user.page;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageUserRequestDTO {
    @Builder.Default
    @Min(1)
    private int page = 1;

    @Builder.Default
    private int size = 15;
    private String userId; //검색조건 : 사원번호
    private String userName; //검색조건 : 사원이름
    private String userPosition; //검색조건 : 직책
    private String userStatus = "1"; //0, 1, 2 : 미승인, 비사원, 사원

    public Pageable getPageable(String...props) {
        return PageRequest.of(this.page -1, this.size, Sort.by(props).descending());
    }

    private String link;

    public String getLink() {

        if(link == null){
            StringBuilder builder = new StringBuilder();

            builder.append("page=" + this.page);

            builder.append("&size=" + this.size);
        }

        return link;
    }

    public int getSkip(){
        return (page-1)*15;
    }
}
