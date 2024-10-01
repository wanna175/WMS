package lcw.lcw2_back.dto.auth;

import lcw.lcw2_back.domain.storage.Storage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    private String userId;
    private Long storageId;
    private String userPw;
    private String userName;
    private LocalDate userBirth;
    private String userEmail;
    private String userContact;
}
