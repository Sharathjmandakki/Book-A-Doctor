package bookadoctor.Entitys;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;

@Entity
public class Images {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long iid;
	String username;
	@Lob
	Blob image;
	public long getIid() {
		return iid;
	}
	public void setIid(long iid) {
		this.iid = iid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Blob getImage() {
		return image;
	}
	public void setImage(Blob image) {
		this.image = image;
	}
	@Override
	public String toString() {
		return "Images [iid=" + iid + ", username=" + username + ", image=" + image + "]";
	}
	public Images(long iid, String username, Blob image) {
		super();
		this.iid = iid;
		this.username = username;
		this.image = image;
	}
	public Images() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
