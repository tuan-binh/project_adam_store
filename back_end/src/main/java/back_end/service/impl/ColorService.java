package back_end.service.impl;

import back_end.dto.request.ColorRequest;
import back_end.dto.response.ColorResponse;
import back_end.exception.CustomException;
import back_end.mapper.ColorMapper;
import back_end.model.Color;
import back_end.repository.IColorRepository;
import back_end.service.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ColorService implements IColorService {
	
	@Autowired
	private IColorRepository colorRepository;
	@Autowired
	private ColorMapper colorMapper;
	
	@Override
	public List<ColorResponse> findAll() {
		return colorRepository.findAll().stream()
				  .map(item -> colorMapper.toResponse(item))
				  .collect(Collectors.toList());
	}
	
	@Override
	public ColorResponse findById(Long id) throws CustomException {
		Optional<Color> optionalColor = colorRepository.findById(id);
		return optionalColor.map(item -> colorMapper.toResponse(item)).orElseThrow(()->new CustomException("color not found"));
	}
	
	@Override
	public ColorResponse save(ColorRequest colorRequest) {
		return colorMapper.toResponse(colorRepository.save(colorMapper.toEntity(colorRequest)));
	}
	
	@Override
	public ColorResponse update(ColorRequest colorRequest, Long id) {
		Color color = colorMapper.toEntity(colorRequest);
		color.setId(id);
		return colorMapper.toResponse(colorRepository.save(color));
	}
	
	@Override
	public ColorResponse changeStatusColor(Long id) throws CustomException {
		Optional<Color> optionalColor = colorRepository.findById(id);
		if (optionalColor.isPresent()) {
			Color color = optionalColor.get();
			color.setStatus(!color.isStatus());
			return colorMapper.toResponse(colorRepository.save(color));
		}
		throw new CustomException("color not found");
	}
}
