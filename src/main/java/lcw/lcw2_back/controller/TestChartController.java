package lcw.lcw2_back.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lcw.lcw2_back.domain.DatasetVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
public class TestChartController {

  @GetMapping("/api/lossData")
  public List<DatasetVO> test() {
    List<DatasetVO> list = new ArrayList<>();
    for (int i = 1; i <= 31; i++) {
      DatasetVO datasetVO = DatasetVO.builder()
          .label(i + "일")
          .data(Math.pow(-1, i) * i)
          .dateTime(LocalDate.of(2024, 8, i))
          .build();
      list.add(datasetVO);
    }
    return list;
  }

  @GetMapping("/api/usageData")
  public Map<String, Object> usage() {
    List<DatasetVO> list = new ArrayList<>();
    for (int i = 1; i <= 5; i++) {
      DatasetVO datasetVO = DatasetVO.builder()
          .label("상품" + i)
          .data(3.0 * i)
          .build();
      list.add(datasetVO);
    }

    Map<String, Object> map = new HashMap<>();
    map.put("storageArea", 50.0);
    map.put("products", list);

    return map;
  }

  @GetMapping("/api/inboundForWeekData")
  public Map<String, Long> inboundForWeek() {
    Map<String, Long> map = new HashMap<>();

    map.put("req", 127L);
    map.put("comp", 75L);

    return map;
  }

  @GetMapping("/api/outboundForWeekData")
  public Map<String, Long> outboundForWeek() {
    Map<String, Long> map = new HashMap<>();

    map.put("req", 82L);
    map.put("comp", 45L);

    return map;
  }

  @GetMapping("/api/invInTrend")
  public Map<String, List<Long>> invInTrend() {
    Map<String, List<Long>> map = new HashMap<>();
    for (int i = 1; i <= 5; i++) {
      List<Long> list = new ArrayList<>();
      for (int j = 1; j <= 12; j++) {
        long x = (long) Math.max(0, 1000.0 + (Math.random() * 1000 - 500));
        list.add(x);
      }
      map.put("상품" + i, list);
    }

    log.info("입고 : " + map);

    return map;
  }

  @GetMapping("/api/invOutTrend")
  public Map<String, List<Long>> invOutTrend() {
    Map<String, List<Long>> map = new HashMap<>();
    for (int i = 1; i <= 5; i++) {
      List<Long> list = new ArrayList<>();
      for (int j = 1; j <= 12; j++) {
        long x = (long) Math.max(0, 1000.0 + (Math.random() * 1000 - 500));
        list.add(x);
      }
      map.put("상품" + i, list);
    }

    log.info("출고 : " + map);

    return map;
  }

  @GetMapping("/api/invTotalTrend")
  public Map<String, List<Long>> invTotalTrend() {
    Map<String, List<Long>> map = new HashMap<>();
    for (int i = 1; i <= 5; i++) {
      List<Long> list = new ArrayList<>();
      for (int j = 1; j <= 12; j++) {
        long x = (long) Math.max(0, 1000.0 + (Math.random() * 1000 - 500));
        list.add(x);
      }
      map.put("상품" + i, list);
    }

    log.info("전체 : " + map);

    return map;
  }

//  @GetMapping("/api/invOutTrend")
//  public List<Map> invOutTrend() {
//    List<Map> list = new ArrayList<>();
//    Map<String, String>
//  }
//
//  @GetMapping("/api/invTotalTrend")
//  public List<Map> invTotalTrend() {
//    List<Map> list = new ArrayList<>();
//    Map<String, String>
//  }

}
//  loss
//      usage
//  storageArea
//      inboundRequestForWeek
//  inboundCompletionForWeek
//      inboundRequestForMonth
//  inboundProcessingForMonth
//      inboundCompletionForMonth
//  outboundRequestForWeek
//      outboundCompletionForWeek
//  outboundRequestForMonth
//      outboundProcessingForMonth
//  outboundCompletionForMonth
//      inventoryTrend


