package lcw.lcw2_back.controller;

import jakarta.validation.Valid;
import lcw.lcw2_back.domain.outbound.Outbound;
import lcw.lcw2_back.dto.OutboundDTO;
import lcw.lcw2_back.dto.Page.PageRequestDTO;
import lcw.lcw2_back.dto.Page.PageResponseDTO;
import lcw.lcw2_back.service.outbound.OutboundServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OutboundController {

    private final OutboundServiceImpl outboundService;

    // 출고 요청서 조회
    @GetMapping("/outbound/request_list")
    public Map<String, Object> requestList(@ModelAttribute @Valid PageRequestDTO pageRequestDTO, BindingResult bindingResult) {

        // 결과를 담을 Map 객체
        Map<String, Object> resultMap = new HashMap<>();

        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            resultMap.put("error", bindingResult.getAllErrors());
            return resultMap;
        }

        // 서비스에서 조회된 데이터와 페이지 정보를 받아옴
        PageResponseDTO<OutboundDTO> responseDTO = outboundService.getNotDoneList(pageRequestDTO);

        // 결과를 Map에 추가
        resultMap.put("data", responseDTO.getDtoList());
        resultMap.put("pageInfo", responseDTO);

        return resultMap;
    }

    //출고현황 조회
    @GetMapping("outbound/request_done_list")
    public Map<String, Object> requestDoneList(@ModelAttribute @Valid PageRequestDTO pageRequestDTO, BindingResult bindingResult) {

        // 결과를 담을 Map 객체
        Map<String, Object> resultMap = new HashMap<>();

        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            resultMap.put("error", bindingResult.getAllErrors());
            return resultMap;
        }

        // 서비스에서 조회된 데이터와 페이지 정보를 받아옴
        PageResponseDTO<OutboundDTO> responseDTO = outboundService.getDoneList(pageRequestDTO);

        // 결과를 Map에 추가
        resultMap.put("data", responseDTO.getDtoList());
        resultMap.put("pageInfo", responseDTO);

        return resultMap;
    }

    //출고요청 승인
    @PostMapping(value = "/outbound/reject", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<Long>> approveOutboundRequests(@RequestBody OutboundDTO outboundDTO) {

        // 서비스 호출하여 출고 요청 승인 처리
        outboundService.modifyApprove(outboundDTO.getOutboundIds());

        // 응답을 담을 Map 생성
        Map<String, List<Long>> responseMap = new HashMap<>();

        // 응답으로 승인된 ID 리스트를 전달
        responseMap.put("outboundIds", outboundDTO.getOutboundIds());

        return responseMap;
    }

    //출고요청 반려
    @PostMapping(value = "/outbound/approve", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<Long>> rejectOutboundRequests(@RequestBody OutboundDTO outboundDTO) {

        // 서비스 호출하여 출고 요청 승인 처리
        outboundService.modifyRejected(outboundDTO.getOutboundIds());

        // 응답을 담을 Map 생성
        Map<String, List<Long>> responseMap = new HashMap<>();

        // 응답으로 승인된 ID 리스트를 전달
        responseMap.put("outboundIds", outboundDTO.getOutboundIds());

        return responseMap;
    }
}
