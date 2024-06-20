package bookadoctor.Services.ServicesInterfaces;

import java.util.List;

import bookadoctor.Entitys.Appointment;

public interface AppointmentServicesInterface {
	String addAppointment(Appointment a);
	String deleteAppointment(Long id);
	List<Appointment> usersAppointment(String username);
	List<Appointment> docAppointment(String username);
}
