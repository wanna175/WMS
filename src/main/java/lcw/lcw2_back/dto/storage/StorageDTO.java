package lcw.lcw2_back.dto.storage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StorageDTO {
    private Long storageId;
    private String storageName;
    private String address;
    private String addressDetail;
    private Long zipcode;
    private Long storageArea;
}
