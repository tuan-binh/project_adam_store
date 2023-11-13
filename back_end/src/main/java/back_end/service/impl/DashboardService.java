package back_end.service.impl;

import back_end.dto.response.ResultResponse;
import back_end.model.*;
import back_end.repository.IOrderRepository;
import back_end.repository.IProductDetailRepository;
import back_end.repository.IUserRepository;
import back_end.service.IDashboardService;
import back_end.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService implements IDashboardService {
	
	@Autowired
	private IOrderRepository orderRepository;
	@Autowired
	private IProductDetailRepository productDetailRepository;
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IRoleService roleService;
	
	@Override
	public ResultResponse getResultInDashboard() {
		// revenue
		List<Orders> order = orderRepository.findAllByStatusAndOrderStatus(true, OrderStatus.SUCCESS);
		double revenue = 0;
		for (Orders o:order) {
			revenue += o.getTotal();
		}
		// orders
		List<Orders> quantityOrder = orderRepository.findAllByStatus(true);
		int orders = quantityOrder.size();
		// products
		List<ProductDetail> productDetails = productDetailRepository.findAll();
		int products = 0;
		for (ProductDetail pd:productDetails) {
			products += pd.getStock();
		}
		// users
		List<Users> user = userRepository.findAll();
		int users = 0;
		for (Users u:user) {
			if(!u.getRoles().contains(roleService.findByRoleName(RoleName.ROLE_ADMIN))) {
				users += 1;
			}
		}
		
		return ResultResponse.builder()
				  .revenue(revenue)
				  .orders(orders)
				  .products(products)
				  .users(users)
				  .build();
	}
}
