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
	
	// chức năng lấy tất cả thông tin màu có trong hệ thống
	@Override
	public List<ColorResponse> findAll(String search) {
		// Khai báo danh sách màu
		List<ColorResponse> list;
		// Kiểm tra nếu tham số tìm kiếm trống
		if (search.isEmpty()) {
			// Lấy tất cả màu, ánh xạ kết quả sang danh sách ColorResponse bằng cách sử dụng một mapper
			list = colorRepository.findAll().stream()
					  .map(item -> colorMapper.toResponse(item))
					  .collect(Collectors.toList());
		} else {
			// Ngược lại, tìm các màu chứa tên màu tương ứng (không phân biệt chữ hoa chữ thường)
			// Ánh xạ kết quả sang danh sách ColorResponse bằng cách sử dụng một mapper
			list = colorRepository.findAllByColorNameContainingIgnoreCase(search).stream()
					  .map(item -> colorMapper.toResponse(item))
					  .collect(Collectors.toList());
		}
		// Trả về danh sách màu
		return list;
	}
	
	// chức năng lấy thông tin màu theo id
	@Override
	public ColorResponse findById(Long id) throws CustomException {
		// Tìm kiếm màu theo ID. Nếu tìm thấy, ánh xạ kết quả sang ColorResponse bằng cách sử dụng một mapper
		// Nếu không tìm thấy, ném một ngoại lệ tùy chỉnh thông báo rằng màu không được tìm thấy
		Optional<Color> optionalColor = colorRepository.findById(id);
		return optionalColor.map(item -> colorMapper.toResponse(item)).orElseThrow(()->new CustomException("color not found"));
	}
	
	// chức năng thêm thông tin màu mới vào hệ thống
	@Override
	public ColorResponse save(ColorRequest colorRequest) throws CustomException {
		// Nếu đã tồn tại một màu với tên tương ứng (không phân biệt chữ hoa chữ thường), ném một ngoại lệ tùy chỉnh
		// Ngược lại, ánh xạ màu từ ColorRequest, lưu và ánh xạ kết quả sang ColorResponse
		if(colorRepository.existsByColorNameIgnoreCase(colorRequest.getColorName())) {
			throw new CustomException("color name is exists");
		}
		return colorMapper.toResponse(colorRepository.save(colorMapper.toEntity(colorRequest)));
	}
	
	// chức năng update thông tin màu theo id
	@Override
	public ColorResponse update(ColorRequest colorRequest, Long id) throws CustomException {
		// Ánh xạ màu từ ColorRequest, đặt ID và kiểm tra tên màu cập nhật
		// Nếu tên giống với tên hiện có, cập nhật và trả về màu
		// Nếu tên không giống và đã tồn tại một màu với tên cập nhật, ném một ngoại lệ tùy chỉnh
		// Ngược lại, cập nhật và trả về màu
		Color color = colorMapper.toEntity(colorRequest);
		color.setId(id);
		if(colorRequest.getColorName().toUpperCase().equals(colorRepository.findById(id).orElseThrow(()->new CustomException("category not found")).getColorName())) {
			return colorMapper.toResponse(colorRepository.save(color));
		}
		if(colorRepository.existsByColorNameIgnoreCase(color.getColorName())) {
			throw new CustomException("color name is exists");
		}
		return colorMapper.toResponse(colorRepository.save(color));
	}
	
	// chức năng thay đổi trạng thái của màu (true or false)
	@Override
	public ColorResponse changeStatusColor(Long id) throws CustomException {
		// Tìm kiếm màu theo ID. Nếu tìm thấy, thay đổi trạng thái và trả về màu đã cập nhật
		// Nếu không tìm thấy, ném một ngoại lệ tùy chỉnh thông báo rằng màu không được tìm thấy
		Optional<Color> optionalColor = colorRepository.findById(id);
		if (optionalColor.isPresent()) {
			Color color = optionalColor.get();
			color.setStatus(!color.isStatus());
			return colorMapper.toResponse(colorRepository.save(color));
		}
		throw new CustomException("color not found");
	}
}
