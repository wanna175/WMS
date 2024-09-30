package lcw.lcw2_back.config;

import lcw.lcw2_back.auth.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//로컬(같은 ip)에서 프론트 , 서버 돌릴때 cors문제를 피하기 위한 설정..
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final JwtInterceptor jwtInterceptor;

    @Autowired
    public WebConfig(JwtInterceptor jwtInterceptor) {
        this.jwtInterceptor = jwtInterceptor;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("cors 설정");
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .maxAge(3600);
        registry.addMapping("/auth/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .maxAge(3600);
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        System.out.println("인터셉터 설정");
         //JWT 인터셉터를 모든 경로에 등록
        registry.addInterceptor(jwtInterceptor)
               .addPathPatterns("/api/**") // 모든 경로에 대해 적용
                .excludePathPatterns("/auth/**"); // 인증 관련 경로는 제외 (로그인, 토큰 재발급 등)
    }
}