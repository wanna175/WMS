package lcw.lcw2_back.repository.userTest;

import lcw.lcw2_back.domain.userTest.Role;
import lcw.lcw2_back.domain.userTest.UserTest;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MemoryUserRepository implements UserRepository{
    private final Map<String, UserTest> storge = new ConcurrentHashMap<>();


    @Override
    public void addUser(UserTest user) {
        storge.put(user.getUserId(), user);
    }

    @Override
    public UserTest findByUserId(String userId) {
        System.out.println("여기까진 오나?");
        if(userId.equals("admin")&&storge.get(userId)==null){
            addUser(new UserTest("admin",null,"1234","고안나",
                    LocalDate.now(),"jh5045@naver.com","01022222", Role.GENERAL_MANAGER,"1"));
            System.out.println("admin 계정이 생성되었습니다.");
        }

        return storge.get(userId);
    }
}
