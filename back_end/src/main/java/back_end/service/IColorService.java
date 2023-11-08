package back_end.service;

import back_end.dto.request.ColorRequest;
import back_end.dto.response.ColorResponse;
import back_end.exception.CustomException;

import java.util.List;

public interface IColorService {
	
	List<ColorResponse> findAll(String search);
	
	ColorResponse findById(Long id) throws CustomException;
	
	ColorResponse save(ColorRequest colorRequest) throws CustomException;
	
	ColorResponse update(ColorRequest colorRequest,Long id) throws CustomException;
	
	ColorResponse changeStatusColor(Long id) throws CustomException;
	
}
