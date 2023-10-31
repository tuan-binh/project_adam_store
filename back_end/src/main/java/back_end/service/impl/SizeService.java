package back_end.service.impl;

import back_end.dto.request.SizeRequest;
import back_end.dto.response.SizeResponse;
import back_end.exception.CustomException;
import back_end.mapper.SizeMapper;
import back_end.model.Size;
import back_end.repository.ISizeRepository;
import back_end.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SizeService implements ISizeService {
	
	@Autowired
	private ISizeRepository sizeRepository;
	@Autowired
	private SizeMapper sizeMapper;
	
	@Override
	public List<SizeResponse> findAll() {
		return sizeRepository.findAll().stream()
				  .map(item -> sizeMapper.toResponse(item))
				  .collect(Collectors.toList());
	}
	
	@Override
	public SizeResponse findById(Long id) throws CustomException {
		Optional<Size> optionalSize = sizeRepository.findById(id);
		return optionalSize.map(item -> sizeMapper.toResponse(item)).orElseThrow(()->new CustomException("size not found"));
	}
	
	@Override
	public SizeResponse save(SizeRequest sizeRequest) {
		return sizeMapper.toResponse(sizeRepository.save(sizeMapper.toEntity(sizeRequest)));
	}
	
	@Override
	public SizeResponse update(SizeRequest sizeRequest, Long id) {
		Size size = sizeMapper.toEntity(sizeRequest);
		size.setId(id);
		return sizeMapper.toResponse(sizeRepository.save(size));
	}
	
	@Override
	public SizeResponse changeStatusSize(Long id) throws CustomException {
		Optional<Size> optionalSize = sizeRepository.findById(id);
		if(optionalSize.isPresent()) {
			Size size = optionalSize.get();
			size.setStatus(!size.isStatus());
			return sizeMapper.toResponse(sizeRepository.save(size));
		}
		throw new CustomException("size not found");
	}
}
