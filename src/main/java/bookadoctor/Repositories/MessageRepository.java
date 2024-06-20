package bookadoctor.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bookadoctor.Entitys.Messages;

public interface MessageRepository extends JpaRepository<Messages, Long>{
	public List<Messages> findByUser(String user);
}
