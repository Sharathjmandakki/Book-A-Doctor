package bookadoctor.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bookadoctor.Entitys.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
	List<Appointment> findByUsers(String users);
	List<Appointment> findByDoctor(String doctor);
}
