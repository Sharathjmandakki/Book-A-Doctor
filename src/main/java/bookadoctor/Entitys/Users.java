package bookadoctor.Entitys;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long uid;
	String username;
	String role;
	String mobileNo;
	String email;
	String password;
	boolean img;
	String loc;
	String spc;
	@ManyToMany 
	List<Users> fev;
	String avltime;
	public long getUid() {
		return uid;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUid(long uid) {
		this.uid = uid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean getImg() {
		return img;
	}

	public void setImg(boolean img) {
		this.img = img;
	}

	public String getLoc() {
		return loc;
	}

	public void setLoc(String loc) {
		this.loc = loc;
	}

	public String getSpc() {
		return spc;
	}

	public void setSpc(String spc) {
		this.spc = spc;
	}

	public List<Users> getFev() {
		return fev;
	}

	public void setFev(List<Users> fev) {
		this.fev = fev;
	}

	public String getAvltime() {
		return avltime;
	}

	public void setAvltime(String avltime) {
		this.avltime = avltime;
	}

	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Users(long uid, String username, String role, String mobileNo, String email, String password, boolean img,
			String loc, String spc,String avltime, List<Users> fev) {
		super();
		this.uid = uid;
		this.username = username;
		this.role = role;
		this.mobileNo = mobileNo;
		this.email = email;
		this.password = password;
		this.img = img;
		this.loc = loc;
		this.spc = spc;
		this.avltime=avltime;
		this.fev = fev;
	}

	@Override
	public String toString() {
		return "Users [uid=" + uid + ", username=" + username + ", role=" + role + ", mobileNo=" + mobileNo + ", email="
				+ email + ", password=" + password + ", img=" + img + ", loc=" + loc + ", spc=" + spc + ", fev=" + fev + ", avltime=" + avltime + "]";
	}
}
