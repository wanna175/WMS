package lcw.lcw2_back.service.notification;

import lcw.lcw2_back.domain.notification.NotificationType;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {
    //로그인시 sse 연결
    public SseEmitter connectSSE(String userId);
    //sse 연결 해제
    public void closeSSEConnect(String userId);
    //통지보내기
    public void send(String receivedUserId, NotificationType notificationType,String content);
    //받은 통지 읽음 표시
    public void updateNotificationCache(String notificationId);
    //통지 삭제
    public void deleteNotificationCache(String notificationId);
    //모든 통지 삭제
    public void deleteAllNotificationCache(String userId);
}
