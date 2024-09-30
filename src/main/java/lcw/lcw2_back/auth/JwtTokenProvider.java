package lcw.lcw2_back.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import lcw.lcw2_back.domain.auth.AccessToken;
import lcw.lcw2_back.domain.auth.RefreshToken;
import lcw.lcw2_back.domain.userTest.Role;
import lcw.lcw2_back.dto.auth.LoginJwtResponse;
import lcw.lcw2_back.repository.auth.AccessTokenRepository;
import lcw.lcw2_back.repository.auth.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {
    public final static long ACCESS_TOKEN_TIME = 1000*60*60*60;//30min
    public final static String ACCESS_PREFIX_STRING = "Bearer ";
    public final static String ACCESS_HEADER_STRING = "Authorization";
    public final static String REFRESH_HEADER_STRING = "RefreshToken";
    public final static long REFRESH_TOKEN_TIME = 1000 * 60 * 60 * 24 * 2;//2days

    private String key;
    private String keyBase64Encoded;
    private SecretKey signingKey;//서명키
    private String issuer;

    private final AccessTokenRepository accessTokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;


    @Autowired
    public JwtTokenProvider(@Value("${jwt.secret_key}")String keyParam,@Value("${jwt.issuer}")String issuer,
                            AccessTokenRepository accessTokenRepository,RefreshTokenRepository refreshTokenRepository){
        this.key=keyParam;
        this.keyBase64Encoded = Base64.getEncoder().encodeToString(this.key.getBytes());
        this.signingKey = Keys.hmacShaKeyFor(this.keyBase64Encoded.getBytes());//서명키를 얻는 과정 대칭키 HMAC방식으로
        this.issuer = issuer;
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    //로그인시 보낼 토큰 생성
    public LoginJwtResponse createLoginToken(String userId,Role role){
        return new LoginJwtResponse(createAccessToken(userId,role),
                createRefreshToken(userId,role));
    }
    //JWT 토큰 생성
    public String createAccessToken(String userId, Role role) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("role", role);  // 사용자 권한을 토큰에 저장

        Date now = new Date();
        Date expiration = new Date(now.getTime() + ACCESS_TOKEN_TIME);

        String accessToken =  ACCESS_PREFIX_STRING + Jwts.builder()
                .setIssuer(this.issuer)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, this.signingKey)  // 서명 알고리즘과 secretKey 설정
                .compact();

        accessTokenRepository.deleteTokenByUserId(userId);
        accessTokenRepository.addToken(new AccessToken(accessToken,userId,expiration));

        return accessToken;
    }
    //리프레시 토큰 생성
    private String createRefreshToken(String userId,Role role) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("role",role);
        Date now = new Date();
        Date expiration = new Date(now.getTime() + REFRESH_TOKEN_TIME);

        String refreshToken =  REFRESH_HEADER_STRING + Jwts.builder()
                .setIssuer(this.issuer)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, this.signingKey)  // 서명 알고리즘과 secretKey 설정
                .compact();

        refreshTokenRepository.deleteTokenByUserId(userId);
        refreshTokenRepository.addToken(new RefreshToken(refreshToken,userId,expiration));

        return refreshToken;
    }


    //토큰에서 사용자Id 추출
    public String getUserId(String token) {
        try{
            return Jwts.parser()
                .setSigningKey(this.signingKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        } catch (ExpiredJwtException e) {
            // 토큰이 만료되었을 때의 예외 처리
            System.out.println("Token has expired: " + e.getMessage());
        } catch (SignatureException e) {
            // 토큰 서명이 유효하지 않을 때의 예외 처리
            System.out.println("Invalid JWT signature: " + e.getMessage());
        } catch (JwtException e) {
            // 기타 JWT 처리 중 발생한 예외 처리
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (Exception e) {
            // 기타 예외 처리
            System.out.println("An error occurred while parsing the token: " + e.getMessage());
        }
        return null;
    }
    //토큰에서 권한 추출
    public String getRole(String token) {
        try{
            String role = Jwts.parser()
                .setSigningKey(this.signingKey)
                .parseClaimsJws(token)
                .getBody()
                .get("role").toString();
            return role;
        } catch (ExpiredJwtException e) {
            // 토큰이 만료되었을 때의 예외 처리
            System.out.println("Token has expired: " + e.getMessage());
        } catch (SignatureException e) {
            // 토큰 서명이 유효하지 않을 때의 예외 처리
            System.out.println("Invalid JWT signature: " + e.getMessage());
        } catch (JwtException e) {
            // 기타 JWT 처리 중 발생한 예외 처리
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (Exception e) {
            // 기타 예외 처리
            System.out.println("An error occurred while parsing the token: " + e.getMessage());
        }
        return null;
    }
    public Date getExpiration(String token){
        try{
            return Jwts.parser()
                    .setSigningKey(this.signingKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();
        } catch (ExpiredJwtException e) {
            // 토큰이 만료되었을 때의 예외 처리
            System.out.println("Token has expired: " + e.getMessage());
        } catch (SignatureException e) {
            // 토큰 서명이 유효하지 않을 때의 예외 처리
            System.out.println("Invalid JWT signature: " + e.getMessage());
        } catch (JwtException e) {
            // 기타 JWT 처리 중 발생한 예외 처리
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (Exception e) {
            // 기타 예외 처리
            System.out.println("An error occurred while parsing the token: " + e.getMessage());
        }
        return null;
    }

    public boolean validateToken(String accessToken){
        AccessToken ret = accessTokenRepository.findTokenByUserId(this.getUserId(accessToken));
        return ret != null && !ret.getExpiration().before(new Date());
    }
    public boolean validateRefreshToken(String refreshToken){

        RefreshToken ret = refreshTokenRepository.findTokenByUserId(this.getUserId(refreshToken));
        return ret != null && !ret.getExpiration().after(new Date());//현재 시간이 만료라면
    }

    public void deleteTokenByUserId(String userId){
        accessTokenRepository.deleteTokenByUserId(userId);
        refreshTokenRepository.deleteTokenByUserId(userId);
    }

    //HTTP 요청 헤더에서 토큰 가져오기
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(ACCESS_HEADER_STRING);
        System.out.println(bearerToken);
        if (bearerToken != null && bearerToken.startsWith(ACCESS_PREFIX_STRING))
            return bearerToken.substring(7);  // "Bearer " 이후의 토큰 값만 가져옴
        return null;
    }
}


