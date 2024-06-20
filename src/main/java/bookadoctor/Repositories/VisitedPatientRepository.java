package bookadoctor.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bookadoctor.Entitys.VisitedPatient;

public interface VisitedPatientRepository extends JpaRepository<VisitedPatient, Long> {
	List<VisitedPatient> findByOid(long oid);
	List<VisitedPatient> findByDoctor(String doctor);
	List<VisitedPatient> findByUsers(String users);
}
