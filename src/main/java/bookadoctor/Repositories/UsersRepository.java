package bookadoctor.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bookadoctor.Entitys.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
	Users findByEmail(String email);
	Users findByMobileNo(String mobileNo);
	Users findByUsername(String username);
	List<Users> findByRole(String role);
}
