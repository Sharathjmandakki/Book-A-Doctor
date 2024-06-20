package bookadoctor.Services.ServicesInterfaces;

import java.sql.Blob;

import bookadoctor.Entitys.Images;

public interface ImageServeceInterface {
	public Images getImages(String username);
	String updateImages(String username, Blob img);
}
