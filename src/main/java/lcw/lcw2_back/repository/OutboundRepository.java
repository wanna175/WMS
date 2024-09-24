//package lcw.lcw2_back.repository;
//
//import jakarta.transaction.Transactional;
//import lcw.lcw2_back.domain.outbound.Outbound;
//import lcw.lcw2_back.domain.storage.Storage;
//import lcw.lcw2_back.domain.user.User;
//import lcw.lcw2_back.dto.OutboundDTO;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//
//public interface OutboundRepository extends JpaRepository<Outbound, Long> {
//
//    //체크박스에서 체크한 요청 승인 dao
//    @Modifying
//    @Transactional
//    @Query("UPDATE Outbound o SET o.status = 'APPROVED' WHERE o.outboundId IN :ids")
//    void updateStatusForOutboundIds(@Param("ids") List<Long> outboundIds);
//
//    //출고요청서 전체 조회(미승인, 승인 조건 만들어야 하는데 검색엔진으로 커버 가능한지 모르겠으니 일단 보류)
//    @Query("SELECT new lcw.lcw2_back.dto.OutboundDTO(o.outboundId, p.productName, s_from.storageName, oi.quantity, o.status, o.requestDate, s_to.storageName) " +
//            "FROM Outbound o " +
//            "JOIN o.userId u " +
//            "JOIN u.storageId s_from " +
//            "JOIN o.receivingStorageId s_to " +
//            "JOIN Item oi ON oi.outbound = o " +  // Item과 조인
//            "JOIN oi.product p " +  // Product와 조인
//            "WHERE o.status in('NOT APPROVED', 'APPROVED') " +
//            "ORDER BY o.outboundId DESC")
//    Page<OutboundDTO> findOutboundNotDone(Pageable pageable);
//
//    //출고목록(처리) 전체 조회(검색엔진 위와같은 이유로 보류)
//    @Query("SELECT new lcw.lcw2_back.dto.OutboundDTO(o.outboundId, p.productName, s_from.storageName, oi.quantity, o.completeDate, o.status, s_to.storageName) " +
//            "FROM Outbound o " +
//            "JOIN o.userId u " +
//            "JOIN u.storageId s_from " +
//            "JOIN o.receivingStorageId s_to " +
//            "JOIN Item oi ON oi.outbound = o " +  // Item과 조인
//            "JOIN oi.product p " +  // Product와 조인
//            "WHERE o.status in('DONE', 'APPROVED') " +
//            "ORDER BY o.outboundId DESC")
//    Page<OutboundDTO> findOutboundDone(Pageable pageable);
//}
