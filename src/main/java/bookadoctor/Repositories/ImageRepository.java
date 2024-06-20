package bookadoctor.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import bookadoctor.Entitys.Images;

public interface ImageRepository extends JpaRepository<Images, Long> {
	Images findByUsername(String username);
}
