package back_end.service;

import back_end.dto.request.SizeRequest;
import back_end.dto.response.SizeResponse;
import back_end.exception.CustomException;

import java.util.List;

public interface ISizeService {
	
	List<SizeResponse> findAll(String search);
	SizeResponse findById(Long id) throws CustomException;
	SizeResponse save(SizeRequest sizeRequest) throws CustomException;
	SizeResponse update(SizeRequest sizeRequest,Long id) throws CustomException;
	SizeResponse changeStatusSize(Long id) throws CustomException;
}
