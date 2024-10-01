package lcw.lcw2_back.dto.user;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Size;
import lcw.lcw2_back.domain.userTest.Role;
import lcw.lcw2_back.dto.auth.SignInRequest;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String userId;

    private String userPw;

    @Size(max = 30)
    private String userName;

    private Role userPosition;

    private Long storageId; //창고아이디 (창고 테이블과 조인)

    private LocalDate userBirth; //생일

    @Size(max = 30)
    private String userEmail; //이메일

    @Size(max = 15)
    private String userContact; //전화번호

    private String userStatus; //계정 상태

    @Nullable
    private String userProfile; //프로필 사진 uuid

    public UserDTO(SignInRequest sr){
        this.userId = sr.getUserId();
        this.storageId = sr.getStorageId();
        this.userPw = sr.getUserPw();
        this.userName = sr.getUserName();
        this.userBirth = sr.getUserBirth();
        this.userEmail = sr.getUserEmail();
        this.userContact = sr.getUserContact();
        this.userStatus = "0";
        this.userPosition = Role.MANAGER;
    }

}
