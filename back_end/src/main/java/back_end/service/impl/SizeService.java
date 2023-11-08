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
	
	// chức năng lấy tất cả thông tin size có trong hệ thống
	@Override
	public List<SizeResponse> findAll(String search) {
		List<SizeResponse> list;
		
		// Kiểm tra xem có tìm kiếm theo tên kích thước không
		if (search.isEmpty()) {
			// Nếu không có tìm kiếm, lấy danh sách tất cả kích thước và chuyển đổi sang đối tượng response
			list = sizeRepository.findAll().stream()
					  .map(item -> sizeMapper.toResponse(item))
					  .collect(Collectors.toList());
		} else {
			// Nếu có tìm kiếm, lấy danh sách kích thước theo tên và chuyển đổi sang đối tượng response
			list = sizeRepository.findAllBySizeNameContainingIgnoreCase(search).stream()
					  .map(item -> sizeMapper.toResponse(item))
					  .collect(Collectors.toList());
		}
		
		return list;
	}
	
	// chức năng lấy thông tin size theo id
	@Override
	public SizeResponse findById(Long id) throws CustomException {
		// Tìm kích thước theo ID và chuyển đổi sang đối tượng response nếu tồn tại, nếu không ném CustomException
		Optional<Size> optionalSize = sizeRepository.findById(id);
		return optionalSize.map(item -> sizeMapper.toResponse(item)).orElseThrow(() -> new CustomException("size not found"));
	}
	
	// chức năng thêm thông tin size mới vào hệ thống
	@Override
	public SizeResponse save(SizeRequest sizeRequest) throws CustomException {
		if (sizeRepository.existsBySizeNameIgnoreCase(sizeRequest.getSizeName())) {
			throw new CustomException("size name is exists");
		}
		// Chuyển đổi đối tượng request thành đối tượng entity, lưu vào cơ sở dữ liệu và chuyển đổi sang đối tượng response
		return sizeMapper.toResponse(sizeRepository.save(sizeMapper.toEntity(sizeRequest)));
	}
	
	// chức năng update thông tin sản phẩm vào hệ thống
	@Override
	public SizeResponse update(SizeRequest sizeRequest, Long id) throws CustomException {
		// Tìm kích thước theo ID, cập nhật thông tin từ request, lưu vào cơ sở dữ liệu và chuyển đổi sang đối tượng response
		Size size = sizeMapper.toEntity(sizeRequest);
		size.setId(id);
		if (sizeRequest.getSizeName().toUpperCase().equals(sizeRepository.findById(id).orElseThrow(() -> new CustomException("category not found")).getSizeName())) {
			return sizeMapper.toResponse(sizeRepository.save(size));
		}
		if (sizeRepository.existsBySizeNameIgnoreCase(size.getSizeName())) {
			throw new CustomException("color name is exists");
		}
		
		return sizeMapper.toResponse(sizeRepository.save(size));
	}
	
	// chức năng thay đổi trạng thái của size đó theo id ( true or false )
	@Override
	public SizeResponse changeStatusSize(Long id) throws CustomException {
		// Tìm kích thước theo ID, thay đổi trạng thái và chuyển đổi sang đối tượng response nếu tồn tại, nếu không ném CustomException
		Optional<Size> optionalSize = sizeRepository.findById(id);
		if (optionalSize.isPresent()) {
			Size size = optionalSize.get();
			size.setStatus(!size.isStatus());
			return sizeMapper.toResponse(sizeRepository.save(size));
		}
		throw new CustomException("size not found");
	}
}
