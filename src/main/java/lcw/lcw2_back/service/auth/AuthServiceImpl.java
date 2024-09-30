package lcw.lcw2_back.service.auth;

import lcw.lcw2_back.auth.JwtTokenProvider;
import lcw.lcw2_back.domain.userTest.Role;
import lcw.lcw2_back.domain.userTest.UserTest;
import lcw.lcw2_back.dto.auth.LoginJwtResponse;
import lcw.lcw2_back.dto.auth.LoginRequest;
import lcw.lcw2_back.dto.auth.SignInRequest;
import lcw.lcw2_back.exception.auth.TokenExpirationException;
import lcw.lcw2_back.exception.auth.UserIdNotFoundException;
import lcw.lcw2_back.exception.auth.UserPasswordNotCorrectException;
import lcw.lcw2_back.exception.auth.UserStatusNotPermissionException;
import lcw.lcw2_back.global.Utils.PasswordEncoder;
import lcw.lcw2_back.repository.userTest.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public LoginJwtResponse login(LoginRequest loginRequest) throws UserIdNotFoundException, UserPasswordNotCorrectException {
        UserTest user = userRepository.findByUserId(loginRequest.getUserId());
        if(user==null) throw new UserIdNotFoundException("유저 이름을 찾을 수 없습니다.");

        String encryptedPassword = passwordEncoder.getSHA256EncryptedPassword(loginRequest.getPassword());
        UserTest storageUser = userRepository.findByUserId(user.getUserId());

        if(user.getUserId().equals("admin")) //admin은 걍 로그인 되게하자.
            return jwtTokenProvider.createLoginToken(user.getUserId(),user.getUserPosition());

        if (!passwordEncoder.matches(encryptedPassword,storageUser.getUserPw())) {
            throw new UserPasswordNotCorrectException("비밀번호가 일치하지 않습니다.");
        }

        if(storageUser.getUserStatus()==null)
            throw new UserStatusNotPermissionException("회원 계정이 승인되지 않았습니다.");

        return jwtTokenProvider.createLoginToken(user.getUserId(),user.getUserPosition());
    }

    @Override
    public void logout(String userId) {
        // 로그아웃 처리
       try{
        jwtTokenProvider.deleteTokenByUserId(userId);
       }catch (Exception e){
           System.out.println("토큰 레포지토리 오류...");
       }
    }

    @Override
    public void signIn(SignInRequest signInRequest) {
        String encryptedPassword = passwordEncoder.getSHA256EncryptedPassword(signInRequest.getUserPw());
        System.out.println("암호화된 패스워드: " + encryptedPassword);
        System.out.println("length: " + encryptedPassword.length());

        signInRequest.setUserPw(encryptedPassword);
        UserTest newUser = new UserTest(signInRequest);

        userRepository.addUser(newUser);
    }
    @Override
    public LoginJwtResponse reissueAccessToken(String refreshToken) {


        String userId = jwtTokenProvider.getUserId(refreshToken);

        Date expiration = jwtTokenProvider.getExpiration(refreshToken);
        //실제로는 user Table 에서 직접 가져오는것이 맞겠지...
        String role = jwtTokenProvider.getRole(refreshToken);

        // refreshToken과 DB에 저장된 refreshToken의 값이 일치하는지 확인
        if(!jwtTokenProvider.validateRefreshToken(refreshToken)){
            this.logout(userId);
            throw new TokenExpirationException("토큰의 유효기간 만료");
        }
        // 재발급
        String accessToken = jwtTokenProvider.createAccessToken(userId,Enum.valueOf(Role.class,role));

        return new LoginJwtResponse(accessToken, refreshToken);
    }
}
