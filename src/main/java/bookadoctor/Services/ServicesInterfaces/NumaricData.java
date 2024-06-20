package bookadoctor.Services.ServicesInterfaces;

import java.util.List;

public class NumaricData {
	long total;
	long docs;
	long admins;
	List<String> admNames;
	long users;
	long msgs;
	public long getDocs() {
		return docs;
	}
	public void setDocs(long docs) {
		this.docs = docs;
	}
	public long getAdmins() {
		return admins;
	}
	public void setAdmins(long admins) {
		this.admins = admins;
	}
	public long getUsers() {
		return users;
	}
	public void setUsers(long users) {
		this.users = users;
	}
	public long getMsgs() {
		return msgs;
	}
	public void setMsgs(long msgs) {
		this.msgs = msgs;
	}
	
	public List<String> getAdmNames() {
		return admNames;
	}
	public void setAdmNames(List<String> admNames) {
		this.admNames = admNames;
	}
	
	public long getTotal() {
		return total;
	}
	public void setTotal(long total) {
		this.total = total;
	}
	public NumaricData() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "NumaricData [total=" + total + ", docs=" + docs + ", admins=" + admins + ", admNames=" + admNames
				+ ", users=" + users + ", msgs=" + msgs + "]";
	}
	
	
}



