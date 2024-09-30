package lcw.lcw2_back.controller;

import lcw.lcw2_back.auth.JwtTokenProvider;
import lcw.lcw2_back.service.notification.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/notification")
@AllArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping(value = "/connect", produces = "text/event-stream")
    public ResponseEntity<SseEmitter> sseConnect(@RequestHeader(value=JwtTokenProvider.ACCESS_HEADER_STRING, required=false)String token){
        if(token==null) return ResponseEntity.internalServerError().build();

        SseEmitter emitter = notificationService.connectSSE(jwtTokenProvider.getUserId(token.substring(7)));
        return ResponseEntity.ok(emitter);
    }
    //아직 결정을 못함...통지를 닫으면 동시에 읽음 처리를 할지...
    //아님 하나 누를때마다 걍 보내야 할지...
    @PostMapping("/isRead")
    public ResponseEntity<?> readNotification(){
        return null;
    }
    //읽은 메세지를 전체삭제할지.. 하나씩 삭제할지...
    @PostMapping("/delete")
    public ResponseEntity<?> deleteNotification(){
        return null;
    }


}
