package back_end.mapper;

import back_end.dto.request.SizeRequest;
import back_end.dto.response.SizeResponse;
import back_end.model.Size;
import org.springframework.stereotype.Component;

@Component
public class SizeMapper implements IGenericMapper<Size, SizeRequest, SizeResponse> {
	@Override
	public Size toEntity(SizeRequest sizeRequest) {
		return Size.builder()
				  .sizeName(sizeRequest.getSizeName().toUpperCase())
				  .status(sizeRequest.isStatus())
				  .build();
	}
	
	@Override
	public SizeResponse toResponse(Size size) {
		return SizeResponse.builder()
				  .id(size.getId())
				  .sizeName(size.getSizeName())
				  .status(size.isStatus())
				  .build();
	}
}
