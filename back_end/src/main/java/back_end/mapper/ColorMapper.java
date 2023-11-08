package back_end.mapper;

import back_end.dto.request.ColorRequest;
import back_end.dto.response.ColorResponse;
import back_end.model.Color;
import org.springframework.stereotype.Component;

@Component
public class ColorMapper implements IGenericMapper<Color, ColorRequest, ColorResponse> {
	@Override
	public Color toEntity(ColorRequest colorRequest) {
		return Color.builder()
				  .colorName(colorRequest.getColorName().toUpperCase())
				  .status(colorRequest.isStatus())
				  .build();
	}
	
	@Override
	public ColorResponse toResponse(Color color) {
		return ColorResponse.builder()
				  .id(color.getId())
				  .colorName(color.getColorName())
				  .status(color.isStatus())
				  .build();
	}
}
