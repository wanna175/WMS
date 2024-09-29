package lcw.lcw2_back.outbound.service;

import lcw.lcw2_back.dto.storage.StorageDTO;
import lcw.lcw2_back.service.storage.StorageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class StorageServiceTests {
    @Autowired
    private StorageService storageService;

    @Test
    public void registerStorageTest() {
        StorageDTO storageDTO = StorageDTO.builder()
                .storageName("registerTest")
                .address("addressTest")
                .addressDetail("addressDetailTest")
                .zipcode(1010L)
                .storageArea(9999L)
                .build();

        storageService.plusStorage(storageDTO);
    }

    @Test
    public void getStorageTest() {
        storageService.getStorage();
    }

    @Test
    public void modifyStorageTest() {
        StorageDTO storageDTO = StorageDTO.builder()
                .storageArea(8888L)
                .addressDetail("modifyTest")
                .storageId(7L)
                .build();

        storageService.changeStorage(storageDTO);
    }

//    @Test
//    public void removeStorageTest() {
//        storageService.clearStorageOne(7L);
//    }
}
