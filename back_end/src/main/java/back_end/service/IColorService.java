package back_end.service;

import back_end.dto.request.ColorRequest;
import back_end.dto.response.ColorResponse;
import back_end.exception.CustomException;

import java.util.List;

public interface IColorService {
	
	List<ColorResponse> findAll();
	
	ColorResponse findById(Long id) throws CustomException;
	
	ColorResponse save(ColorRequest colorRequest);
	
	ColorResponse update(ColorRequest colorRequest,Long id);
	
	ColorResponse changeStatusColor(Long id) throws CustomException;
	
}
