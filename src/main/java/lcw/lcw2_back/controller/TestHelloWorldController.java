package lcw.lcw2_back.controller;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lcw.lcw2_back.auth.JwtTokenProvider;
import lcw.lcw2_back.service.notification.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

//프록시 설정한 리액트 프로젝트로 잘 데이터가 전달이 되는지 테스트하는 클래스.
//궁금하면 돌려봐 다들
@RestController
@AllArgsConstructor
public class TestHelloWorldController {
    private final NotificationService notificationService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/api/hello")
    public String test(){
        return "Hello World";
    }
    @GetMapping("api/ko")
    public String test2(){
        return "lcw프로젝트입니다.";
    }
    @GetMapping("api/jw")
    public String test3(){
        return "고재현";
    }
    @GetMapping(value = "/api/test/notice", produces = "text/event-stream")
    @ResponseStatus(HttpStatus.OK)
    public SseEmitter sseConnect(@RequestParam(value = "userId" , defaultValue = "0")String userId){
        return notificationService.connectSSE(userId);
    }
    @GetMapping("api/test/headerToken")
    public ResponseEntity<?> testTokenHeader(HttpServletRequest httpServletRequest){
        String token = jwtTokenProvider.resolveToken(httpServletRequest);

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("not include token");
            //return ResponseEntity.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).body("not include token");
        }
        // 토큰이 유효할 경우, 추가 로직을 넣을 수 있음 (예: 토큰 검증)
        boolean isValid = jwtTokenProvider.validateToken(token);

        // 토큰이 유효하지 않은 경우
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
        }

        // 토큰이 유효한 경우 200 상태 코드 반환
        return ResponseEntity.ok("토큰이 유효합니다: " + token);
    }
}
