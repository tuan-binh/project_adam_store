package back_end.service.impl;

import back_end.dto.response.ResultResponse;
import back_end.dto.response.RevenueMoney;
import back_end.dto.response.RevenueOrders;
import back_end.dto.response.RevenueProduct;
import back_end.model.*;
import back_end.repository.IOrderRepository;
import back_end.repository.IProductDetailRepository;
import back_end.repository.IProductRepository;
import back_end.repository.IUserRepository;
import back_end.service.IDashboardService;
import back_end.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
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
	private IProductRepository productRepository;
	@Autowired
	private IRoleService roleService;
	
	@Override
	public ResultResponse getResultInDashboard() {
		// revenue
		List<Orders> order = orderRepository.findAllByStatusAndOrderStatus(true, OrderStatus.SUCCESS);
		double revenue = 0;
		for (Orders o : order) {
			revenue += o.getTotal();
		}
		// orders
		List<Orders> quantityOrder = orderRepository.findAllByStatus(true);
		int orders = quantityOrder.size();
		// products
		List<ProductDetail> productDetails = productDetailRepository.findAll();
		int products = 0;
		for (ProductDetail pd : productDetails) {
			products += pd.getStock();
		}
		// users
		List<Users> user = userRepository.findAll();
		int users = 0;
		for (Users u : user) {
			if (!u.getRoles().contains(roleService.findByRoleName(RoleName.ROLE_ADMIN))) {
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
	
	@Override
	public List<RevenueMoney> getRevenueMoney(Integer year) {
		List<RevenueMoney> list = new ArrayList<>();
		for (int i = 1; i <= 12; i++) {
			Double result = orderRepository.findByTimeGVCTotal(year, i, OrderStatus.SUCCESS);
			if (result == null) {
				result = 0.0;
			}
			list.add(RevenueMoney.builder().month(getMonthByIndex(i)).revenue(result).build());
		}
		return list;
	}
	
	@Override
	public List<RevenueOrders> getRevenueOrder(Integer year) {
		List<RevenueOrders> list = new ArrayList<>();
		for (int i = 1; i <= 12; i++) {
			Integer success = orderRepository.getCountOrderByOrderStatus(year, i, OrderStatus.SUCCESS);
			Integer cancel = orderRepository.getCountOrderByOrderStatus(year, i, OrderStatus.CANCEL);
			if (success == null) {
				success = 0;
			}
			if (cancel == null) {
				cancel = 0;
			}
			list.add(RevenueOrders.builder().month(getMonthByIndex(i)).success(success).cancel(cancel).build());
		}
		return list;
	}
	
	@Override
	public List<RevenueProduct> getRevenueProduct() {
		List<Product> products = productRepository.findAll();
		products.sort(Comparator.comparingInt(Product::getBought).reversed());
		List<RevenueProduct> list = new ArrayList<>();
		for (int i = 1; i <= 5; i++) {
			try {
				list.add(RevenueProduct.builder().top("Top " + i).product(products.get(i - 1)).build());
			} catch (IndexOutOfBoundsException ignored) {}
		}
		return list;
	}
	
	public String getMonthByIndex(int index) {
		switch (index) {
			case 1:
				return "January";
			case 2:
				return "February";
			case 3:
				return "March";
			case 4:
				return "April";
			case 5:
				return "May";
			case 6:
				return "June";
			case 7:
				return "July";
			case 8:
				return "August";
			case 9:
				return "September";
			case 10:
				return "October";
			case 11:
				return "November";
			case 12:
				return "December";
		}
		return null;
	}
	
	
}

