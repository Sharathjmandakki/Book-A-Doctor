package bookadoctor.Entitys;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	String doctor;
	String users;
	String time;
	String spc;
	String mobile;

	public Appointment(long id, String doctor, String users, String time,String spc,String mobile) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.users = users;
		this.time = time;
		this.spc=spc;
		this.mobile=mobile;
	}

	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDoctor() {
		return doctor;
	}

	public String getSpc() {
		return spc;
	}

	public void setSpc(String spc) {
		this.spc = spc;
	}

	public void setDoctor(String doctor) {
		this.doctor = doctor;
	}

	public String getUsers() {
		return users;
	}

	public void setUsers(String users) {
		this.users = users;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
	

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Override
	public String toString() {
		return "Opponents [id=" + id + ", doctor=" + doctor + ", users=" + users + ", time=" + time + ", spc=" + spc
				+ "]";
	}

}
