package lcw.lcw2_back.auth;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lcw.lcw2_back.service.notification.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@AllArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //preflight 요청은 토큰 검증 안하기.
        if(request.getMethod().equals("OPTIONS")) return true;


        // 헤더에서 토큰을 가져오기
        System.out.println("토큰 유효성 검사..."+request);
        String token = jwtTokenProvider.resolveToken(request);
        System.out.println("받은 토큰 : "+token);
        String userId = null;
        if(token!=null)
            userId = jwtTokenProvider.getUserId(token);

        if (token == null || !jwtTokenProvider.validateToken(token)) {
            // 유효하지 않은 토큰이거나 없는 경우 401 반환
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or missing token");
            if(userId!=null) {
                System.out.println("Ssemitter");
            }
            return false; // 요청 중단
        }

        // 토큰이 유효한 경우 true 반환 (요청을 진행)
        return true;
    }

}
