package back_end.service;

import back_end.dto.request.SizeRequest;
import back_end.dto.response.SizeResponse;
import back_end.exception.CustomException;

import java.util.List;

public interface ISizeService {
	
	List<SizeResponse> findAll();
	SizeResponse findById(Long id) throws CustomException;
	SizeResponse save(SizeRequest sizeRequest);
	SizeResponse update(SizeRequest sizeRequest,Long id);
	SizeResponse changeStatusSize(Long id) throws CustomException;
}
