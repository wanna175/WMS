package lcw.lcw2_back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.OAuth2ClientDsl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
@Configuration
@EnableWebSecurity //이 클래스는 스프링 시큐리티에 의해 관리됨
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .authorizeHttpRequests((auth) -> auth
//                        .requestMatchers("/", "/login").permitAll()
//                        .requestMatchers("/api/**", "/wms/**").authenticated() //api 하위 경로는 로그인한 사용자만 가능
//                        .requestMatchers("/api/admin/**", "wms/admin/**").hasRole("ADMIN") //어드민인 경우만 사용 가능
//                        .requestMatchers("/api/auth/**").permitAll() // 인증 관련 API는 누구나 접근 가능
//                        .anyRequest().authenticated() //그 외 위에서 못 잡은 것들
                        .requestMatchers("/**").permitAll() //모든 요청 허용(개발시)
                );
        http
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화 (사이트 변조 방지 서비스 : 원래 CSRF 토큰도 함께 보내줘야 시큐리티 작동함)
                .cors(cors -> cors.configurationSource(corsConfigurationSource())); // CORS 설정
        http
                // 로그인 폼 설정 (React에서 로그인 처리)
                .formLogin(form -> form
                        .loginPage("/login") // 리액트에서 제공하는 로그인 페이지 경로
                        .loginProcessingUrl("/api/loginProc") // 로그인 처리 URL
                        .defaultSuccessUrl("/wms") // 로그인 성공 후 이동할 페이지
                        .permitAll() // 로그인 페이지는 인증 없이 접근 가능
                )
                // 로그아웃 설정
                .logout(logout -> logout
                        .logoutUrl("/api/logout") // 로그아웃 처리 URL
                        .logoutSuccessUrl("/login") // 로그아웃 성공 시 리디렉션할 URL
                        .permitAll()
                );
        //다중 로그인 설정

        http
                .sessionManagement((auth) -> auth
                        .maximumSessions(1)
                        .maxSessionsPreventsLogin(true));
        // 세션 고정 공격 대비
        http
                .sessionManagement((auth) -> auth
                        .sessionFixation().changeSessionId());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // 리액트 서버
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    public RoleHierarchy roleHierarchy() {
        return RoleHierarchyImpl.withDefaultRolePrefix()
                .role("USER").implies("ADMIN")
                .build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() { //비밀번호 암호화 : 단방향 해시
        return new BCryptPasswordEncoder();
    }

}
