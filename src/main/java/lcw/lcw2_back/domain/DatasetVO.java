package lcw.lcw2_back.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DatasetVO {

  private String label;
  private Double data;

  @JsonFormat(pattern = "yyyy-MM-DD")
  private LocalDate dateTime;

}