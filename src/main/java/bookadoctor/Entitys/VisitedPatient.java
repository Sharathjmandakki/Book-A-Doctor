package bookadoctor.Entitys;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class VisitedPatient {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	long oid;
	String doctor;
	String users;
	String time;
	String spc;
	String mobile;
	String tabs;
	
	public VisitedPatient() {
		super();
		// TODO Auto-generated constructor stub
	}

	public VisitedPatient(long id, long oid, String doctor, String users, String time, String spc, String mobile) {
		super();
		this.id = id;
		this.oid = oid;
		this.doctor = doctor;
		this.users = users;
		this.time = time;
		this.spc = spc;
		this.mobile = mobile;
	}
	

	public VisitedPatient(long oid, String doctor, String users, String time, String spc, String mobile) {
		super();
		this.oid = oid;
		this.doctor = doctor;
		this.users = users;
		this.time = time;
		this.spc = spc;
		this.mobile = mobile;
	}

	public long getId() {
		return id;
	}

	public String getTabs() {
		return tabs;
	}

	public void setTabs(String tabs) {
		this.tabs = tabs;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getOid() {
		return oid;
	}

	public void setOid(long oid) {
		this.oid = oid;
	}

	public String getDoctor() {
		return doctor;
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

	public String getSpc() {
		return spc;
	}

	public void setSpc(String spc) {
		this.spc = spc;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Override
	public String toString() {
		return "VisitedPatient [id=" + id + ", oid=" + oid + ", doctor=" + doctor + ", users=" + users + ", time="
				+ time + ", spc=" + spc + ", mobile=" + mobile + "]";
	}
	
	
}
