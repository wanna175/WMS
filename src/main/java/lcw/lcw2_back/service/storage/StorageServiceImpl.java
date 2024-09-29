package lcw.lcw2_back.service.storage;

import lcw.lcw2_back.domain.storage.Storage;
import lcw.lcw2_back.dto.storage.StorageDTO;
import lcw.lcw2_back.mapper.StorageMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService{
    private final ModelMapper modelMapper;
    private final StorageMapper storageMapper;

    @Override
    public void plusStorage(StorageDTO storageDTO) {
        Storage storage = modelMapper.map(storageDTO, Storage.class);

        storageMapper.insertStorage(storage);
    }

    @Override
    public List<StorageDTO> getStorage() {
        List<StorageDTO> dtoList = storageMapper.selectStorage()
                .stream().map(vo->modelMapper.map(vo,StorageDTO.class))
                .collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public void changeStorage(StorageDTO storageDTO) {
        Storage storage = modelMapper.map(storageDTO, Storage.class);
        storageMapper.updateStorage(storage);
    }

    @Override
    public void clearStorageOne(List<Long> storageIds) {
        storageMapper.deleteStorage(storageIds);
    }

    @Override
    public void changeStorageToNull(List<Long> storageIds) {
        storageMapper.updateStorageToNull(storageIds);
    }
}
