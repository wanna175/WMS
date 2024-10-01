package lcw.lcw2_back.domain.chart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chart {
    //손실 - 이번달 지출 [{12일, ₩1405, 2024-09-10}]배열꼴

    //입고 출고 - 최근 7일 동안 입고,출고 요청 수, 완료 수

    //입고 월간 누적 - 이번달(1일부터 31일까지) 입고 예정 수, 입고 대기 수, 배송 대기 수, 완료 수
    
    //출고 월간 누적 - 입고랑 마찬가지

}
