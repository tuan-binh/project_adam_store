package back_end.mapper;

import back_end.dto.request.ProductRequest;
import back_end.dto.request.ProductUpdateRequest;
import back_end.dto.response.ImageResponse;
import back_end.dto.response.ProductResponse;
import back_end.exception.CustomException;
import back_end.model.Color;
import back_end.model.Product;
import back_end.model.ProductDetail;
import back_end.model.Size;
import back_end.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProductMapper implements IGenericMapper<Product, ProductRequest, ProductResponse> {
	
	@Autowired
	private ICategoryRepository categoryRepository;
	@Autowired
	private IImageProductRepository iImageProductRepository;
	@Autowired
	private IProductDetailRepository productDetailRepository;
	@Autowired
	private ProductDetailMapper productDetailMapper;
	
	@Override
	public Product toEntity(ProductRequest productRequest) throws CustomException {
		return Product.builder()
				  .productName(productRequest.getProductName())
				  .description(productRequest.getDescription())
				  .image(productRequest.getImages().get(0))
				  .category(categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new CustomException("category not found")))
				  .status(productRequest.isStatus())
				  .build();
	}
	
	public Product toEntity(ProductUpdateRequest productUpdateRequest) throws CustomException {
		return Product.builder()
				  .productName(productUpdateRequest.getProductName().toUpperCase())
				  .description(productUpdateRequest.getDescription())
				  .category(categoryRepository.findById(productUpdateRequest.getCategoryId()).orElseThrow(() -> new CustomException("category not found")))
				  .status(productUpdateRequest.isStatus())
				  .build();
	}
	
	@Override
	public ProductResponse toResponse(Product product) {
		return ProductResponse.builder()
				  .id(product.getId())
				  .productName(product.getProductName())
				  .description(product.getDescription())
				  .image(product.getImage())
				  .bought(product.getBought())
				  .category(product.getCategory())
				  .colors(getListColorByProductId(product.getId()))
				  .sizes(getListSizeByProductId(product.getId()))
				  .imageResponses(iImageProductRepository.findAllByProductId(product.getId()).stream().map(item -> ImageResponse.builder().id(item.getId()).url(item.getUrl()).build()).collect(Collectors.toList()))
				  .productDetailResponses(productDetailRepository.findAllByProductId(product.getId()).stream().map(item -> productDetailMapper.toResponse(item)).collect(Collectors.toList()))
				  .status(product.isStatus())
				  .build();
	}
	
	public List<Color> getListColorByProductId(Long productId) {
		List<ProductDetail> list = productDetailRepository.findAllByProductId(productId);
		Set<Color> colors = new HashSet<>();
		for (ProductDetail pd : list) {
			if (pd.isStatus()) {
				colors.add(pd.getColor());
			}
		}
		return new ArrayList<>(colors);
	}
	
	public List<Size> getListSizeByProductId(Long productId) {
		List<ProductDetail> list = productDetailRepository.findAllByProductId(productId);
		Set<Size> sizes = new HashSet<>();
		for (ProductDetail pd : list) {
			if (pd.isStatus()) {
				sizes.add(pd.getSize());
			}
		}
		return new ArrayList<>(sizes);
	}
	
}
