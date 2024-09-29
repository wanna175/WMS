package lcw.lcw2_back.mapper;

import lcw.lcw2_back.domain.user.User;
import lcw.lcw2_back.dto.user.page.PageUserRequestDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {

    List<User> selectUserList(PageUserRequestDTO pageUserRequestDTO); //모든 사원 목록 조회하기

    User selectUserById(String userId); //한 명의 회원 정보 조회하기

    int updateUserInfo(User user); //회원 정보 수정하기

    int updateUserStatus(Map<String, String> userStatus); //사원아이디의 status 수정하기 (사원->비사원)

    int insertNewUser(User user); //사원 입력

    int updateUserProfile(Map<String, String> userUuid); // 구글 클라우드에 저장된 링크 저장하기

    String getUserProfileUuid(String userId);

    int deleteUserProfileUuid(String userId);
}
