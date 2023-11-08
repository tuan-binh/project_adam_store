package back_end.service.impl;

import back_end.dto.request.ImageProductRequest;
import back_end.dto.request.ProductDetailRequest;
import back_end.dto.request.ProductRequest;
import back_end.dto.request.ProductUpdateRequest;
import back_end.dto.response.ProductResponse;
import back_end.exception.CustomException;
import back_end.mapper.ProductDetailMapper;
import back_end.mapper.ProductMapper;
import back_end.model.ImageProduct;
import back_end.model.Product;
import back_end.model.ProductDetail;
import back_end.repository.IImageProductRepository;
import back_end.repository.IProductDetailRepository;
import back_end.repository.IProductRepository;
import back_end.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService {
	
	@Autowired
	private IProductRepository productRepository;
	@Autowired
	private IImageProductRepository iImageProductRepository;
	@Autowired
	private IProductDetailRepository productDetailRepository;
	@Autowired
	private ProductMapper productMapper;
	@Autowired
	private ProductDetailMapper productDetailMapper;
	
	@Override
	public Page<ProductResponse> findAll(Pageable pageable,String category,String search) {
		Page<Product> productResponses = productRepository.findAll(pageable);
		return productResponses.map(item -> productMapper.toResponse(item));
	}
	
	@Override
	public ProductResponse findById(Long id) throws CustomException {
		Optional<Product> optionalProduct = productRepository.findById(id);
		return optionalProduct.map(item -> productMapper.toResponse(item)).orElseThrow(() -> new CustomException("product not found"));
	}
	
	@Override
	public ProductResponse save(ProductRequest productRequest) throws CustomException {
		Product product = productMapper.toEntity(productRequest);
		Product newProduct = productRepository.save(product);
		for (String url : productRequest.getImages()) {
			iImageProductRepository.save(ImageProduct.builder().url(url).product(newProduct).build());
		}
		return productMapper.toResponse(newProduct);
	}
	
	@Override
	public ProductResponse update(ProductUpdateRequest productUpdateRequest, Long id) throws CustomException {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			Product newProduct = productMapper.toEntity(productUpdateRequest);
			newProduct.setId(id);
			newProduct.setImage(optionalProduct.get().getImage());
			return productMapper.toResponse(productRepository.save(newProduct));
		}
		throw new CustomException("product not found");
	}
	
	@Override
	public ProductResponse changeStatusProduct(Long id) throws CustomException {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			Product product = optionalProduct.get();
			product.setStatus(!product.isStatus());
			return productMapper.toResponse(productRepository.save(product));
		}
		throw new CustomException("product not found");
	}
	
	// chức năng đối với ảnh của product
	@Override
	public ProductResponse addImageToProduct(ImageProductRequest imageProductRequest, Long id) throws CustomException {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			for (String url : imageProductRequest.getImages()) {
				iImageProductRepository.save(ImageProduct.builder().url(url).product(optionalProduct.get()).build());
			}
			return productMapper.toResponse(productRepository.save(optionalProduct.get()));
		}
		throw new CustomException("product not found");
	}
	
	@Override
	public ProductResponse deleteImageInProduct(Long imageId, Long productId) throws CustomException {
		Optional<ImageProduct> optionalImageProduct = iImageProductRepository.findById(imageId);
		if (optionalImageProduct.isPresent()) {
			if (Objects.equals(optionalImageProduct.get().getProduct().getId(), productId)) {
				iImageProductRepository.deleteById(imageId);
				return productMapper.toResponse(productRepository.findById(productId).orElseThrow(() -> new CustomException("product not found")));
			}
			throw new CustomException("image don't have in this product");
		}
		throw new CustomException("image not found");
	}
	
	// chức năng liên quan đến với product detail
	@Override
	public ProductResponse addProductDetailToProduct(ProductDetailRequest productDetailRequest, Long id) throws CustomException {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			ProductDetail productDetail = productDetailMapper.toEntity(productDetailRequest);
			productDetail.setProduct(optionalProduct.get());
			productDetailRepository.save(productDetail);
			return productMapper.toResponse(productRepository.findById(id).orElseThrow(() -> new CustomException("product not found")));
		}
		throw new CustomException("product not found");
	}
	
	@Override
	public ProductResponse updateProductDetailInProduct(ProductDetailRequest productDetailRequest, Long productDetailId, Long productId) throws CustomException {
		Optional<Product> optionalProduct = productRepository.findById(productId);
		if(optionalProduct.isPresent()) {
			ProductDetail productDetail = productDetailMapper.toEntity(productDetailRequest);
			productDetail.setId(productDetailId);
			if (Objects.equals(productDetail.getProduct().getId(), productId)) {
				productDetailRepository.save(productDetail);
				return productMapper.toResponse(productRepository.findById(productId).orElseThrow(() -> new CustomException("product not found")));
			}
			throw new CustomException("product detail don't have in this product");
		}
		throw new CustomException("product not found");
	}
	
	@Override
	public ProductResponse changeStatusProductDetail(Long productDetailId, Long productId) throws CustomException {
		Optional<Product> optionalProduct = productRepository.findById(productId);
		if(optionalProduct.isPresent()) {
			ProductDetail productDetail = productDetailRepository.findById(productDetailId).orElseThrow(()-> new CustomException("product detail not found"));
			if (Objects.equals(productDetail.getProduct().getId(), productId)) {
				productDetail.setStatus(!productDetail.isStatus());
				productDetailRepository.save(productDetail);
				return productMapper.toResponse(productRepository.findById(productId).orElseThrow(() -> new CustomException("product not found")));
			}
			throw new CustomException("product detail don't have in this product");
		}
		throw new CustomException("product not found");
	}
}
