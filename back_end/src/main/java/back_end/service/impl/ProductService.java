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
	
	// chức năng lấy tất cả thông tin sản phẩm theo thể loại tìm kiếm và phân trang ở trong hệ thống
	@Override
	public Page<ProductResponse> findAll(Pageable pageable, String category, String search) {
		// Khởi tạo đối tượng Page<Product> để lưu trữ danh sách sản phẩm
		Page<Product> products;
		
		// Kiểm tra danh mục và từ khóa tìm kiếm để xác định loại tìm kiếm cần thực hiện
		if (category.equals("ALL")) {
			if (search.isEmpty()) {
				// Nếu danh mục là "ALL" và từ khóa tìm kiếm rỗng, lấy tất cả sản phẩm
				products = productRepository.findAll(pageable);
			} else {
				// Nếu danh mục là "ALL" và có từ khóa tìm kiếm, tìm sản phẩm theo tên chứa từ khóa
				products = productRepository.findAllByProductNameContainingIgnoreCase(search, pageable);
			}
		} else {
			if (search.isEmpty()) {
				// Nếu danh mục khác "ALL" và từ khóa tìm kiếm rỗng, tìm sản phẩm theo danh mục
				products = productRepository.findAllByCategoryCategoryName(category, pageable);
			} else {
				// Nếu danh mục khác "ALL" và có từ khóa tìm kiếm, tìm sản phẩm theo cả tên và danh mục
				products = productRepository.findAllByProductNameContainingIgnoreCaseAndCategoryCategoryName(search, category, pageable);
			}
		}
		
		// Ánh xạ danh sách sản phẩm sang danh sách ProductResponse và trả về
		return products.map(item -> productMapper.toResponse(item));
	}
	
	// chức năng lấy thông tin sản phẩm theo id
	@Override
	public ProductResponse findById(Long id) throws CustomException {
		// Tìm kiếm sản phẩm theo ID và ánh xạ sang ProductResponse khi tìm thấy, nếu không ném CustomException
		Optional<Product> optionalProduct = productRepository.findById(id);
		return optionalProduct.map(item -> productMapper.toResponse(item)).orElseThrow(() -> new CustomException("product not found"));
	}
	
	// chức năng thêm thông tin sản phẩm vào trong hệ thống
	@Override
	public ProductResponse save(ProductRequest productRequest) throws CustomException {
		// Ánh xạ ProductRequest thành đối tượng Product và lưu vào cơ sở dữ liệu
		Product product = productMapper.toEntity(productRequest);
		if(productRepository.existsByProductNameIgnoreCase(product.getProductName())) {
			throw new CustomException("Product Name is exists");
		}
		Product newProduct = productRepository.save(product);
		
		// Lưu các URL ảnh liên quan vào cơ sở dữ liệu và ánh xạ sang ProductResponse
		for (String url : productRequest.getImages()) {
			iImageProductRepository.save(ImageProduct.builder().url(url).product(newProduct).build());
		}
		return productMapper.toResponse(newProduct);
	}
	
	// chức năng update thông tin sản phẩm theo id
	@Override
	public ProductResponse update(ProductUpdateRequest productUpdateRequest, Long id) throws CustomException {
		// Tìm kiếm sản phẩm theo ID và thực hiện cập nhật nếu tìm thấy, nếu không ném CustomException
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			// Ánh xạ ProductUpdateRequest thành đối tượng Product và cập nhật thông tin
			Product newProduct = productMapper.toEntity(productUpdateRequest);
			newProduct.setId(id);
			newProduct.setImage(optionalProduct.get().getImage());
			if(productUpdateRequest.getProductName().toUpperCase().equals(newProduct.getProductName())) {
				return productMapper.toResponse(productRepository.save(newProduct));
			}
			if(productRepository.existsByProductNameIgnoreCase(newProduct.getProductName())) {
				throw new CustomException("Product Name is exists");
			}
			// Ánh xạ và trả về ProductResponse sau khi cập nhật
			return productMapper.toResponse(productRepository.save(newProduct));
		}
		throw new CustomException("product not found");
		
	}
	
	// chức năng thay đổi trạng thái của sản phẩm ( true or false )
	@Override
	public ProductResponse changeStatusProduct(Long id) throws CustomException {
		// Tìm kiếm sản phẩm theo ID và thực hiện thay đổi trạng thái nếu tìm thấy, nếu không ném CustomException
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			Product product = optionalProduct.get();
			product.setStatus(!product.isStatus());
			
			// Ánh xạ và trả về ProductResponse sau khi thay đổi trạng thái
			return productMapper.toResponse(productRepository.save(product));
		}
		throw new CustomException("product not found");
	}
	
	// =========== chức năng đối với ảnh của product ===========
	
	// chức năng thêm danh sách ảnh vào sản phẩm theo id sản phẩm
	@Override
	public ProductResponse addImageToProduct(ImageProductRequest imageProductRequest, Long id) throws CustomException {
		// Tìm kiếm sản phẩm theo ID và thực hiện thêm ảnh nếu tìm thấy, nếu không ném CustomException
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			for (String url : imageProductRequest.getImages()) {
				// Lưu các URL ảnh mới vào cơ sở dữ liệu và ánh xạ sang ProductResponse
				iImageProductRepository.save(ImageProduct.builder().url(url).product(optionalProduct.get()).build());
			}
			return productMapper.toResponse(productRepository.save(optionalProduct.get()));
		}
		throw new CustomException("product not found");
	}
	
	// chức năng xóa ảnh của sản phẩm dựa vào id ảnh và id sản phẩm
	@Override
	public ProductResponse deleteImageInProduct(Long imageId, Long productId) throws CustomException {
		// Tìm kiếm ảnh theo ID và thực hiện xóa nếu tìm thấy, nếu không ném CustomException
		Optional<ImageProduct> optionalImageProduct = iImageProductRepository.findById(imageId);
		if (optionalImageProduct.isPresent()) {
			if (Objects.equals(optionalImageProduct.get().getProduct().getId(), productId)) {
				// Xóa ảnh và trả về ProductResponse sau khi xóa
				iImageProductRepository.deleteById(imageId);
				return productMapper.toResponse(productRepository.findById(productId).orElseThrow(() -> new CustomException("product not found")));
			}
			throw new CustomException("image don't have in this product");
		}
		throw new CustomException("image not found");
	}
	
	// =========== chức năng liên quan đến với product detail ===========
	
	// chức năng liên quan đến thêm thông tin đến sản phẩm chi tiết dựa theo id của sản phẩm
	@Override
	public ProductResponse addProductDetailToProduct(ProductDetailRequest productDetailRequest, Long id) throws CustomException {
		// Tìm kiếm sản phẩm theo ID và thực hiện thêm chi tiết sản phẩm nếu tìm thấy, nếu không ném CustomException
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			ProductDetail productDetail = productDetailMapper.toEntity(productDetailRequest);
			productDetail.setProduct(optionalProduct.get());
			
			// Lưu chi tiết sản phẩm và trả về ProductResponse sau khi thêm mới
			productDetailRepository.save(productDetail);
			return productMapper.toResponse(productRepository.findById(id).orElseThrow(() -> new CustomException("product not found")));
		}
		throw new CustomException("product not found");
	}
	
	// chức năng update thông tin sản phẩm chi tiết dựa theo id chi tiết và id product
	@Override
	public ProductResponse updateProductDetailInProduct(ProductDetailRequest productDetailRequest, Long productDetailId, Long productId) throws CustomException {
		// Tìm kiếm sản phẩm theo ID và thực hiện cập nhật chi tiết sản phẩm nếu tìm thấy, nếu không ném CustomException
		Optional<Product> optionalProduct = productRepository.findById(productId);
		Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(productDetailId);
		if (optionalProduct.isPresent()) {
			ProductDetail productDetail = productDetailMapper.toEntity(productDetailRequest);
			productDetail.setId(productDetailId);
			
			// Kiểm tra xem chi tiết sản phẩm có thuộc sản phẩm hay không trước khi cập nhật
			if (Objects.equals(optionalProductDetail.get().getProduct().getId(), productId)) {
				// Lưu chi tiết sản phẩm và trả về ProductResponse sau khi cập nhật
				productDetail.setProduct(optionalProduct.get());
				productDetailRepository.save(productDetail);
				return productMapper.toResponse(productRepository.findById(productId).orElseThrow(() -> new CustomException("product not found")));
			}
			throw new CustomException("product detail don't have in this product");
		}
		throw new CustomException("product not found");
	}
	
	@Override
	public ProductResponse changeStatusProductDetail(Long productDetailId, Long productId) throws CustomException {
		// Tìm kiếm sản phẩm theo ID và thực hiện thay đổi trạng thái chi tiết sản phẩm nếu tìm thấy, nếu không ném CustomException
		Optional<Product> optionalProduct = productRepository.findById(productId);
		if (optionalProduct.isPresent()) {
			ProductDetail productDetail = productDetailRepository.findById(productDetailId).orElseThrow(() -> new CustomException("product detail not found"));
			
			// Kiểm tra xem chi tiết sản phẩm có thuộc sản phẩm hay không trước khi thay đổi trạng thái
			if (Objects.equals(productDetail.getProduct().getId(), productId)) {
				productDetail.setStatus(!productDetail.isStatus());
				
				// Lưu chi tiết sản phẩm và trả về ProductResponse sau khi thay đổi trạng thái
				productDetailRepository.save(productDetail);
				return productMapper.toResponse(productRepository.findById(productId).orElseThrow(() -> new CustomException("product not found")));
			}
			throw new CustomException("product detail don't have in this product");
		}
		throw new CustomException("product not found");
	}
}
