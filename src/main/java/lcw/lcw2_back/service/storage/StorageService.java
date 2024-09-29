package lcw.lcw2_back.service.storage;

import lcw.lcw2_back.dto.storage.StorageDTO;

import java.util.List;

public interface StorageService {

    void plusStorage(StorageDTO storageDTO);

    List<StorageDTO> getStorage();

    void changeStorage(StorageDTO storageDTO);

    void clearStorageOne(List<Long> storageIds);
    void changeStorageToNull(List<Long> storageIds);
}
