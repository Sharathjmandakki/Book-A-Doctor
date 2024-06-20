package bookadoctor.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookadoctor.Entitys.Appointment;
import bookadoctor.Entitys.VisitedPatient;
import bookadoctor.Services.AppointmentServices;

@RestController
@RequestMapping
@CrossOrigin("*")
public class AppointmentController {
	@Autowired
	AppointmentServices as;
	@PostMapping("add/appointment")
	public String addAppointment(@RequestBody Appointment a) {
		return as.addAppointment(a);
	}
	@DeleteMapping("deleted/appointment/{id}")
	public String deleteAppointment(@PathVariable Long id) {
		return as.deleteAppointment(id);
	}
	
	@GetMapping("/myAppointment/{users}")
	public List<Appointment> usersAppointment(@PathVariable String users) {
		// TODO Auto-generated method stub
		return as.usersAppointment(users);
	}
	@GetMapping("/appointment/{doctor}")
	public List<Appointment> docAppointment( @PathVariable String doctor) {
		// TODO Auto-generated method stub
		return as.docAppointment(doctor);
	}

	@GetMapping("/numDocAppointment/{doctor}")
	public long numDocAppointment( @PathVariable String doctor) {
		// TODO Auto-generated method stub
		return as.docAppointment(doctor).size();
	}
	
	@GetMapping("visit/numDocAppointment/{doctor}")
	public List<Long> visitNumAppointment( @PathVariable String doctor) {
		// TODO Auto-generated method stub
		return as.visitNumAppointment(doctor);
	}

	@GetMapping("visit/appointment/{id}/spc/{spc}/tab/{tab}")
	public String visitAppointment(@PathVariable Long id,@PathVariable String spc,@PathVariable String tab ) {
		return as.visitAppointment(id,spc,tab);
	}
	@GetMapping("visit/myAppointments/{users}")
	public List<VisitedPatient> usersVistAppointment(@PathVariable String users) {
		// TODO Auto-generated method stub
		return as.usersVistAppointment(users);
	}
	@GetMapping("visit/appointments/{doctor}")
	public List<VisitedPatient> visitAppointment( @PathVariable String doctor) {
		// TODO Auto-generated method stub
		return as.visitAppointment(doctor);
	}
	
	//search
	@GetMapping("search/appointments/{searchd}")
	public List<Appointment> searchdocAppointment( @PathVariable String searchd) {
		// TODO Auto-generated method stub
		return as.searchdocAppointment(searchd);
	}
	@GetMapping("search/visit/appointments/{searchd}")
	public List<VisitedPatient> searchvisitAppointment( @PathVariable String searchd) {
		// TODO Auto-generated method stub
		return as.searchvisitAppointment(searchd);
	}
}
