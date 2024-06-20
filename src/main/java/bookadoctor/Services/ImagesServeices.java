package bookadoctor.Services;

import java.sql.Blob;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookadoctor.Entitys.Images;
import bookadoctor.Entitys.Users;
import bookadoctor.Repositories.ImageRepository;
import bookadoctor.Repositories.UsersRepository;
import bookadoctor.Services.ServicesInterfaces.ImageServeceInterface;

@Service
public class ImagesServeices implements ImageServeceInterface {
	@Autowired
	ImageRepository ir;
	@Autowired
	UsersRepository ur;
	@Override
	public String updateImages(String username, Blob image) {
		Users usr=ur.findByUsername(username);
		System.out.println(usr);
		if (usr == null) {
			return "User not found";
		} else {
			Images i=ir.findByUsername(username);
			if(i==null) {
				i=new Images();
				i.setUsername(username);
				i.setImage(image);
				ir.save(i);
				usr.setImg(true);
				ur.save(usr);
				return "added";
			}else {
				i.setImage(image);
				ir.save(i);
				usr.setImg(true);
				ur.save(usr);
				return "Updated";
			}
		}
	}

	public Optional<byte[]> getUserImage(String username) {
		Images img = ir.findByUsername(username);
		if (img != null) {
			try {
				Blob imageBlob = img.getImage();
				int blobLength = (int) imageBlob.length();
				byte[] imageBytes = imageBlob.getBytes(1, blobLength);
				return Optional.of(imageBytes);
			} catch (Exception e) {
				e.printStackTrace();
				return Optional.empty();
			}
		}
		return Optional.empty();
	}

	@Override
	public Images getImages(String username) {
		// TODO Auto-generated method stub
		return null;
	}

}
