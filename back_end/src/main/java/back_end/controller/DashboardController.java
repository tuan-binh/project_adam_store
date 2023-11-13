package back_end.controller;

import back_end.dto.response.ResultResponse;
import back_end.service.IDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
}
