package lcw.lcw2_back.outbound.mapper;

import lcw.lcw2_back.domain.storage.Storage;
import lcw.lcw2_back.mapper.StorageMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class StorageMapperTests {
    @Autowired
    private StorageMapper storageMapper;

    @Test
    public void selectStorageTest() {
        storageMapper.selectStorage();
    }

    @Test
    public void insertStorageTest() {
        Storage storage = Storage.builder()
                .storageName("insertTest")
                .address("addressTest")
                .addressDetail("addressDetailTest")
                .zipcode(1111L)
                .storageArea(5000L)
                .build();

        storageMapper.insertStorage(storage);
    }

    @Test
    public void updateStorageTest() {
        Storage storage = Storage.builder()
                .storageId(6L)
                .storageName("updateTest")
                .storageArea(1000L)
                .build();

        storageMapper.updateStorage(storage);
    }

//    @Test
//    public void deleteStorageTest() {
//        storageMapper.deleteStorage();
//    }
}
