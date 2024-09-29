package lcw.lcw2_back.controller;

import jakarta.validation.Valid;
import lcw.lcw2_back.dto.user.UserDTO;
import lcw.lcw2_back.dto.user.page.PageUserRequestDTO;
import lcw.lcw2_back.dto.user.page.PageUserResponseDTO;
import lcw.lcw2_back.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {



    private final UserService userService;



    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDTO userDTO) {

        return userService.insertNewUser(userDTO)
                ? ResponseEntity.ok("성공 : 회원가입 요청")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패 : 회원가입 요청");

    }

    @PostMapping("/list")
    public Map<String, Object> getUserList(@RequestBody @Valid PageUserRequestDTO pageUserRequestDTO, BindingResult bindingResult) {
        Map<String, Object> responseMap = new HashMap<>();

        if (bindingResult.hasErrors()) {
            responseMap.put("error", bindingResult.getAllErrors());
            return responseMap;
        }

        PageUserResponseDTO<UserDTO> responseDTO = userService.getUserList(pageUserRequestDTO);

        log.info("REQUEST DTO TESTING : " + pageUserRequestDTO.toString());

        responseMap.put("dto", responseDTO.getDtoList());
        responseMap.put("pageInfo", responseDTO);

        log.info("RESPONSE DTO TESTING : " + responseDTO.toString());

        return responseMap;
    }

    @GetMapping("/list")
    public ResponseEntity<UserDTO> getUser(@RequestHeader("userId") String userId) {

        UserDTO userDTO = userService.getUserOne(userId);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        boolean updated = userService.updateUserInfo(userDTO);
        return updated
                ? ResponseEntity.ok("성공 : 사용자 정보 업데이트 완료")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패 : 사용자 정보 업데이트 실패");
    }

    @PutMapping("/update/status")
    public ResponseEntity<String> updateUserStatus(@RequestBody Map<String, String> userStatus) {
        boolean updated = userService.updateUserStatus(userStatus);
        return updated
                ? ResponseEntity.ok("성공 : 사용자 상태 업데이트 완료")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패 : 사용자 상태 업데이트 실패");
    }

    @PostMapping("/profile/upload")
    public ResponseEntity<String> uploadUserProfileImg (@RequestParam("userId") String userId, @RequestParam("userProfile") MultipartFile image) {

        boolean result;

        //프로필 사진을 업로드할 때
        if (isProfileExists(userId)) {
            //등록된 사진이 있는 경우 (삭제 후 업로드)
            result = uploadProfileWithDelete(userId, image);
        } else {
            //등록된 사진이 없는 경우 (바로 업로드)
            result = uploadNewProfile(userId, image);
        }


        return result
                ? ResponseEntity.ok("성공 : 구글 클라우드 스토리지 업로드")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패 : 구글 클라우드 스토리지 업로드");

    }

    @PostMapping("/profile/delete")
    public ResponseEntity<String> deleteUserProfileImg (@RequestHeader("userId") String userId) {

        return deleteUserProfile(userId)
                ? ResponseEntity.ok("성공 : 구글 스토리지 파일 삭제와 데이터베이스 반영")
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("실패 : 구글 스토리지 파일 삭제와 데이터베이스 반영");

    }

    private boolean isProfileExists(String userId) {
        return userService.getUserProfileUuid(userId) != null;
    }

    private boolean uploadProfileWithDelete(String userId, MultipartFile image) {
        boolean isDeleted = deleteUserProfile(userId);

        if(!isDeleted) {
            return false;
        }

        return uploadNewProfile(userId, image);
    }

    private boolean uploadNewProfile(String userId, MultipartFile image) {
        return userService.uploadUserProfile(Map.of("userId", userId, "userProfile", image));
    }

    private boolean deleteUserProfile(String userId) {
        return userService.deleteUserProfile(userId);
    }


}