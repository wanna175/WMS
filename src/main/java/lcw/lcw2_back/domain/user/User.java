package lcw.lcw2_back.domain.user;

import jakarta.persistence.*;
import lcw.lcw2_back.domain.CommonEntity;
import lcw.lcw2_back.domain.storage.Storage;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Table(name = "user")
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends CommonEntity implements UserDetails{
    //사원아이디 : PK
    @Id
    @Column(name = "user_id", updatable = false, length = 20)
    private String userId;

    //창고아이디 : FK
    @ManyToOne
    @JoinColumn(name = "storage_id", nullable = false)
    private Storage storageId;

    //비번
    @Column(name = "user_pw", nullable = false, length = 30)
    private String userPw;

    //이름
    @Column(name = "user_name", nullable = false, length = 30)
    private String userName;

    //생년월일
    @Column(name = "user_birth", nullable = false)
    private Date userBirth;

    //이메일
    @Column(name = "user_email", nullable = false, unique = true, length = 30)
    private String userEmail;

    //전화번호
    @Column(name = "user_contact", nullable = false, length = 15)
    private String userContact;

    //직책
    @Column(name = "user_position", nullable = false, length = 20)
    private String userPosition;

    //계정 상태 : 활성화는 1, 비활성화는 0
    @Column(name = "user_status", nullable = false)
    private byte userStatus = 1;

    //주소
    @Column(name = "user_address", nullable = false, length = 100)
    private String userAddress;

    //////////////////////////////////////////////////////////////////
    @Override //사용자의 pw 반환
    public String getPassword() {
        return userPw;
    }

    @Override //사용자의 id 반환
    public String getUsername() {
        return userId;
    }

    @Override //사용자의 권한 목록을 반환
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (getUserPosition().equals("ROLE_USER")) {
            authorities.add(new SimpleGrantedAuthority("USER"));
        } else {
            authorities.add(new SimpleGrantedAuthority("MANAGER"));
        }
        return authorities;
    }

    @Override //계정 만료 여부
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override //계정 잠금 여부
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override //패스워드 만료 여부
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override //계정 사용 가능 여부
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
