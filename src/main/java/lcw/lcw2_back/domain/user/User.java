package lcw.lcw2_back.domain.user;

import lcw.lcw2_back.domain.userTest.Role;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {
//    private Login login;
//    private int storageId;
//    private String userName;
//    private LocalDate userBirth;
//    private String userEmail;
//    private String userContact;
//    private LocalDateTime regDate;
//    private LocalDateTime modDate;

    private String userId;

    private String userPw;

    private String userName;

    private Role userPosition;

    private Long storageId;

    private LocalDate userBirth;

    private String userEmail;

    private String userContact;

    private String userStatus;

    private String userProfile;

}
