package lcw.lcw2_back.domain.storage;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Storage {
    private Long storageId;
    private String storageName;
    private String address;
    private String addressDetail;
    private Long zipcode;
    private Long storageArea;
    private List<Long> storageIds;
}
