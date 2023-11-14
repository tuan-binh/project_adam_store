package back_end.controller;

import back_end.dto.response.ResultResponse;
import back_end.dto.response.RevenueMoney;
import back_end.dto.response.RevenueOrders;
import back_end.dto.response.RevenueProduct;
import back_end.service.IDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {
	
	@Autowired
	private IDashboardService dashboardService;

	@GetMapping("/result")
	public ResponseEntity<ResultResponse> getResultDashboard() {
		return new ResponseEntity<>(dashboardService.getResultInDashboard(), HttpStatus.OK);
	}
	
	@GetMapping("/revenue/money")
	public ResponseEntity<List<RevenueMoney>> getRevenueMoney(@RequestParam(defaultValue = "") Integer year) {
		return new ResponseEntity<>(dashboardService.getRevenueMoney(year),HttpStatus.OK);
	}
	
	@GetMapping("/revenue/order")
	public ResponseEntity<List<RevenueOrders>> getRevenueOrders(@RequestParam(defaultValue = "") Integer year) {
		return new ResponseEntity<>(dashboardService.getRevenueOrder(year),HttpStatus.OK);
	}
	
	@GetMapping("/revenue/product")
	public ResponseEntity<List<RevenueProduct>> getRevenueProduct() {
		return new ResponseEntity<>(dashboardService.getRevenueProduct(),HttpStatus.OK);
	}
	
}
