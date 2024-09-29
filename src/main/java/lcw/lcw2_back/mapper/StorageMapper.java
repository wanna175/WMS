package lcw.lcw2_back.mapper;

import lcw.lcw2_back.domain.storage.Storage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StorageMapper {
    List<Storage> selectStorage();

    void insertStorage(Storage storage);

    void deleteStorage(List<Long> storageIds);
    void updateStorageToNull(List<Long> storageIds);

    void updateStorage(Storage storage);

}
