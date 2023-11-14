package back_end.service;

import back_end.dto.response.ResultResponse;
import back_end.dto.response.RevenueMoney;
import back_end.dto.response.RevenueOrders;
import back_end.dto.response.RevenueProduct;

import java.util.List;

public interface IDashboardService {

	ResultResponse getResultInDashboard();
	
	List<RevenueMoney> getRevenueMoney(Integer year);
	
	List<RevenueOrders> getRevenueOrder(Integer year);
	
	List<RevenueProduct> getRevenueProduct();

}
