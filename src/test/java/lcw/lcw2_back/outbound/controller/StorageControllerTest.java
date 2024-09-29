package lcw.lcw2_back.outbound.controller;

import lcw.lcw2_back.controller.StorageController;
import lcw.lcw2_back.dto.storage.StorageDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class StorageControllerTest {

    @Autowired
    private StorageController storageController;

    @Test
    public void storageListTest() {
        StorageDTO storageDTO = new StorageDTO();

        storageController.storageList();
    }
}
