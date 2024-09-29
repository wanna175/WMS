package lcw.lcw2_back.controller;

import jakarta.validation.Valid;
import lcw.lcw2_back.dto.outbound.OutboundDTO;
import lcw.lcw2_back.dto.outbound.OutboundDoneListDTO;
import lcw.lcw2_back.dto.outbound.OutboundIdsDTO;
import lcw.lcw2_back.dto.outbound.OutboundNotDoneListDTO;
import lcw.lcw2_back.dto.outbound.page.PageOutboundRequestDTO;
import lcw.lcw2_back.dto.outbound.page.PageOutboundResponseDTO;
import lcw.lcw2_back.service.outbound.OutboundServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Log4j2
public class OutboundController {

    private final OutboundServiceImpl outboundService;

    //출고요청서 작성
    @PostMapping("outbound/write_outbound")
    public void writeOutbound(@RequestBody OutboundDTO outboundDTO) {
        System.out.println("Received DTO: " + outboundDTO);
        System.out.println("Items: " + outboundDTO.getItems());
        outboundService.registerOutbound(outboundDTO);
    }

    // 출고 요청서 조회
    //RequestBody : HTTP 본문(JSON,XML)을 자바 오브젝트로 변환
    // (GET요청은 데이터 조회에 사용되어서 HTTP본문에 담지 않고 URL 쿼리 파라미터에 데이터를 넣어준다. 그래서 부적합하다.)
    //RequestParam : 단일 객체를 매핑해서 자바 오브젝트로 변환
    // (DTO안에 여러 필드들이 존재해서 그것을 일일히 바꿔줘야 하기 때문에 가독성이 떨어진다.)
    //ModelAttribute : 복합 객체를 매핑해서 자바 오브젝트로 변환
    @GetMapping("/outbound/request_list")
    public Map<String, Object> requestList(@ModelAttribute @Valid PageOutboundRequestDTO pageOutboundRequestDTO, BindingResult bindingResult) {

        // 결과를 담을 Map 객체
        Map<String, Object> resultMap = new HashMap<>();

        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            resultMap.put("error", bindingResult.getAllErrors());
            return resultMap;
        }

        // 서비스에서 조회된 데이터와 페이지 정보를 받아옴
        PageOutboundResponseDTO<OutboundNotDoneListDTO> responseDTO = outboundService.getOutboundNotDoneList(pageOutboundRequestDTO);

        // 결과를 Map에 추가
        resultMap.put("data", responseDTO.getDtoList());
        resultMap.put("pageInfo", responseDTO);

        return resultMap;
    }

    //출고현황 조회
    @GetMapping("outbound/request_done_list")
    public Map<String, Object> requestDoneList(@ModelAttribute @Valid PageOutboundRequestDTO pageOutboundRequestDTO, BindingResult bindingResult) {

        // 결과를 담을 Map 객체
        Map<String, Object> responseMap = new HashMap<>();

        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            responseMap.put("error", bindingResult.getAllErrors());
            return responseMap;
        }

        // 서비스에서 조회된 데이터와 페이지 정보를 받아옴
        PageOutboundResponseDTO<OutboundDoneListDTO> responseDTO = outboundService.getOutboundDoneList(pageOutboundRequestDTO);

        // 결과를 Map에 추가
        responseMap.put("data", responseDTO.getDtoList());
        responseMap.put("pageInfo", responseDTO);

        return responseMap;
    }

    //출고요청 반려
    @PostMapping(value = "/outbound/reject", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<Long>> rejectOutboundRequests(@RequestBody OutboundIdsDTO outboundIdsDTO) {

        // 서비스 호출하여 출고 요청 승인 처리
        outboundService.modifyOutboundRejected(outboundIdsDTO.getOutboundIds());

        // 응답을 담을 Map 생성
        Map<String, List<Long>> responseMap = new HashMap<>();

        // 응답으로 승인된 ID 리스트를 전달
        responseMap.put("outboundIds", outboundIdsDTO.getOutboundIds());

        return responseMap;
    }

    //출고요청 반려
    @PostMapping(value = "/outbound/done_reject", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<Long>> rejectOutboundDone(@RequestBody OutboundIdsDTO outboundIdsDTO) {

        // 서비스 호출하여 출고 요청 승인 처리
        outboundService.modifyOutboundDoneRejected(outboundIdsDTO.getOutboundIds());

        // 응답을 담을 Map 생성
        Map<String, List<Long>> responseMap = new HashMap<>();

        // 응답으로 승인된 ID 리스트를 전달
        responseMap.put("outboundIds", outboundIdsDTO.getOutboundIds());

        return responseMap;
    }

    //출고요청 승인
    @PostMapping(value = "/outbound/approve", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<Long>> approveOutboundRequests(@RequestBody OutboundIdsDTO outboundIdsDTO) {

        // 서비스 호출하여 출고 요청 승인 처리
        outboundService.modifyOutboundApprove(outboundIdsDTO.getOutboundIds());

        // 응답을 담을 Map 생성
        Map<String, List<Long>> responseMap = new HashMap<>();

        // 응답으로 승인된 ID 리스트를 전달
        responseMap.put("outboundIds", outboundIdsDTO.getOutboundIds());

        return responseMap;
    }
}
