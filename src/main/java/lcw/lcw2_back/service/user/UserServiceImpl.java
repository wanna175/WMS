package lcw.lcw2_back.service.user;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import lcw.lcw2_back.domain.user.User;
import lcw.lcw2_back.dto.user.UserDTO;
import lcw.lcw2_back.dto.user.page.PageUserRequestDTO;
import lcw.lcw2_back.dto.user.page.PageUserResponseDTO;
import lcw.lcw2_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final UserMapper userMapper;
    private final Storage storage;
    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    @Override
    public PageUserResponseDTO<UserDTO> getUserList(PageUserRequestDTO pageUserRequestDTO) {
        List<User> userList = userMapper.selectUserList(pageUserRequestDTO);
        List<UserDTO> userDTOList = userList.stream().map(li -> modelMapper.map(li, UserDTO.class)).toList();
        return PageUserResponseDTO.<UserDTO>withAll().dtoList(userDTOList).total(userDTOList.size()).pageUserRequestDTO(pageUserRequestDTO).build();
    }

    @Override
    public UserDTO getUserOne(String userId) {
        return modelMapper.map(userMapper.selectUserById(userId), UserDTO.class);
    }

    @Override
    public boolean updateUserInfo(UserDTO userDTO) {
        return userMapper.updateUserInfo(modelMapper.map(userDTO, User.class)) > 0;
    }

    @Override
    public boolean updateUserStatus(Map<String, String> userStatus) {
        return userMapper.updateUserStatus(userStatus) > 0;
    }

    @Override
    public boolean insertNewUser(UserDTO userDTO) {
        return userMapper.insertNewUser(modelMapper.map(userDTO, User.class)) > 0;
    }

    @Override
    public boolean uploadUserProfile(Map<String, Object> userProfile) {
        String uuid = UUID.randomUUID().toString(); // Google Cloud Storage에 저장될 파일 이름
        MultipartFile image = (MultipartFile) userProfile.get("userProfile"); // 타입 캐스팅

        try (InputStream inputStream = image.getInputStream()) {
            BlobInfo blobInfo = storage.create(
                    BlobInfo.newBuilder(bucketName, uuid)
                            .setContentType(image.getContentType())
                            .build(), inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Map<String, String> map = Map.of(
                "userId", (String) userProfile.get("userId"),
                "userProfile", uuid
        );

        return userMapper.updateUserProfile(map) > 0;
    }


    @Override
    public boolean deleteUserProfile(String userId) {
        String uuid = getUserProfileUuid(userId);

        if (uuid == null) {
            return false;
        }

        try {
            if (storage.delete(bucketName, uuid)) {
                return userMapper.deleteUserProfileUuid(userId) > 0;
            }
        } catch (StorageException e) {
            return false;
        }

        return false;
    }



    @Override
    public String getUserProfileUuid(String userId) {
        return userMapper.getUserProfileUuid(userId);
    }


}
