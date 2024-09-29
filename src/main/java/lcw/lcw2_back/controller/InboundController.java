package lcw.lcw2_back.controller;

import jakarta.validation.Valid;
import lcw.lcw2_back.dto.inbound.InboundDTO;
import lcw.lcw2_back.dto.inbound.InboundDoneListDTO;
import lcw.lcw2_back.dto.inbound.InboundIdsDTO;
import lcw.lcw2_back.dto.inbound.InboundNotDoneListDTO;
import lcw.lcw2_back.dto.inbound.page.PageInboundRequestDTO;
import lcw.lcw2_back.dto.inbound.page.PageInboundResponseDTO;
import lcw.lcw2_back.service.inbound.InboundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class InboundController {
    private final InboundService inboundService;

    //출고요청서 작성
    @PostMapping("inbound/write_inbound")
    public void writeInbound(@RequestBody InboundDTO inboundDTO) {
        inboundService.registerInbound(inboundDTO);
    }

    // 출고 요청서 조회
    @GetMapping("/inbound/request_list")
    public Map<String, Object> requestList(@ModelAttribute @Valid PageInboundRequestDTO pageInboundRequestDTO, BindingResult bindingResult) {

        // 결과를 담을 Map 객체
        Map<String, Object> responseMap = new HashMap<>();

        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            responseMap.put("error", bindingResult.getAllErrors());
            return responseMap;
        }


        // 서비스에서 조회된 데이터와 페이지 정보를 받아옴
        PageInboundResponseDTO<InboundNotDoneListDTO> responseDTO = inboundService.getInboundNotDoneList(pageInboundRequestDTO);

        // 결과를 Map에 추가
        responseMap.put("data", responseDTO.getDtoList());
        responseMap.put("pageInfo", responseDTO);

        return responseMap;
    }

    //출고현황 조회
    @GetMapping("inbound/request_done_list")
    public Map<String, Object> requestDoneList(@ModelAttribute @Valid PageInboundRequestDTO pageInboundRequestDTO, BindingResult bindingResult) {

        // 결과를 담을 Map 객체
        Map<String, Object> responseMap = new HashMap<>();

        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            responseMap.put("error", bindingResult.getAllErrors());
            return responseMap;
        }

        // 서비스에서 조회된 데이터와 페이지 정보를 받아옴
        PageInboundResponseDTO<InboundDoneListDTO> responseDTO = inboundService.getInboundDoneList(pageInboundRequestDTO);

        // 결과를 Map에 추가
        responseMap.put("data", responseDTO.getDtoList());
        responseMap.put("pageInfo", responseDTO);

        return responseMap;
    }

    //출고요청 승인
    @PostMapping(value = "/inbound/approve", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<Long>> approveInboundRequests(@RequestBody InboundIdsDTO inboundIdsDTO) {

        // 서비스 호출하여 출고 요청 승인 처리
        inboundService.modifyInboundApprove(inboundIdsDTO.getInboundIds());

        // 응답을 담을 Map 생성
        Map<String, List<Long>> responseMap = new HashMap<>();

        // 응답으로 승인된 ID 리스트를 전달
        responseMap.put("inboundIds", inboundIdsDTO.getInboundIds());

        return responseMap;
    }

    //출고요청 반려
    @PostMapping(value = "/inbound/reject", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, List<Long>> rejectInboundRequests(@RequestBody InboundIdsDTO inboundIdsDTO) {

        // 서비스 호출하여 출고 요청 승인 처리
        inboundService.modifyInboundRejected(inboundIdsDTO.getInboundIds());

        // 응답을 담을 Map 생성
        Map<String, List<Long>> responseMap = new HashMap<>();

        // 응답으로 승인된 ID 리스트를 전달
        responseMap.put("inboundIds", inboundIdsDTO.getInboundIds());

        return responseMap;
    }
}
