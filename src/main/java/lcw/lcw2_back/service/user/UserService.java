package lcw.lcw2_back.service.user;

import lcw.lcw2_back.dto.user.UserDTO;
import lcw.lcw2_back.dto.user.page.PageUserRequestDTO;
import lcw.lcw2_back.dto.user.page.PageUserResponseDTO;

import java.util.Map;

public interface UserService {

    //1) 사원 관리 페이지 : 등록된 모든 사원 정보 리스트를 조회 & 미승인된 사원 목록을 조회
    PageUserResponseDTO<UserDTO> getUserList(PageUserRequestDTO pageUserRequestDTO);

    //2) 사원 관리 페이지 & 내 계정 페이지 : 하나의 사원 번호로 사원 정보 조회
    UserDTO getUserOne(String userId);

    //3) 내 계정 페이지 : 회원 정보 수정하기
    boolean updateUserInfo(UserDTO userDTO);

    //4) 회원 관리 페이지 : 회원의 계정 상태를 사원-> 비사원 으로 변경
    boolean updateUserStatus(Map<String, String> userStatus);

    //5) 회원가입 시 새 유저 입력하기
    boolean insertNewUser (UserDTO userDTO);

    //6) profile 업로드
    boolean uploadUserProfile(Map<String, Object> userProfile);

    //7) uuid 가져오기
    String getUserProfileUuid(String userId);

    //8) profile delete
    boolean deleteUserProfile(String userId);
}
