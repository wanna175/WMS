package lcw.lcw2_back.controller;

import lcw.lcw2_back.dto.storage.StorageDTO;
import lcw.lcw2_back.service.storage.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/storage")
@Log4j2
public class StorageController {
    private final StorageService storageService;

    @PostMapping("/register_storage")
    public void registerStorage(@RequestBody StorageDTO storageDTO) {
        storageService.plusStorage(storageDTO);
    }

    @GetMapping("/storage_list")
    public Map<String, List<StorageDTO>> storageList() {
        // 서비스 계층에서 저장소 데이터를 가져옴
        List<StorageDTO> storageList = storageService.getStorage();

        Map<String, List<StorageDTO>> responseDTO = new HashMap<>();

        responseDTO.put("data", storageList);

        return responseDTO;
    }

    @PostMapping("/modify_storage")
    public void modifyStorage(@RequestBody StorageDTO storageDTO) {
        storageService.changeStorage(storageDTO);
    }

    @PostMapping("/remove_storage")
    public void removeStorage(@RequestBody List<Long> storageIds) {
        storageService.changeStorageToNull(storageIds);
        storageService.clearStorageOne(storageIds);
    }
}
