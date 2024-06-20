package bookadoctor.Services;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookadoctor.Entitys.Users;
import bookadoctor.Repositories.UsersRepository;
import bookadoctor.Services.ServicesInterfaces.UsersServiceInterface;

@Service
public class UsersServices implements UsersServiceInterface {
	@Autowired
	UsersRepository ur;

	@Override
	public List<String> Login(Users u) {
		// TODO Auto-generated method stub
		ArrayList<String> al = new ArrayList<>();
		Users usr = getUser(u);
		if (usr == null) {
			al.add("Error");
			al.add(u.getEmail() + " : please create your account");
			return al;
		} else {
			al.clear();
			if (u.getPassword().equals(usr.getPassword())) {
				al.add(usr.getUsername());
				al.add(usr.getRole());
				return al;
			} else {
				al.add("Error");
				al.add(u.getEmail() + " Worng password!");
				return al;
			}
		}
	}

	@Override
	public String addUsers(Users u) {
		if (ur.findByEmail(u.getEmail()) != null) {
			return u.getEmail() + " is used by another user";
		}
		if (ur.findByUsername(u.getUsername()) != null) {
			return u.getUsername() + " is used by another user";
		}
		if (ur.findByMobileNo(u.getMobileNo()) != null) {
			return u.getMobileNo() + " is used by another user";
		}
		ur.save(u);
		System.out.println(u);
		return "Success";
	}
	
	public void deletedUser(Long uid) {
		ur.deleteById(uid);
	}

//	@Override
//	public String updateUsers(String username,Blob image) {
//		// TODO Auto-generated method stub
//		Users usr=ur.findByUsername(username);
//		System.out.println(usr);
//		if(usr!=null) {
//			ur.save(usr);
//			return "Updated";
//		}else {
//		return "User not found";
//		}
//	}

	@Override
	public List<Users> allUsers() {
		// TODO Auto-generated method stub
		return ur.findAll();
	}

	@Override
	public Users getUser(Users u) {
		Users usr = ur.findByEmail(u.getEmail());
		if (usr != null) {
			return usr;
		} else {
			usr = ur.findByUsername(u.getEmail());
		}
		if (usr != null) {
			return usr;
		} else {
			usr = ur.findByMobileNo(u.getEmail());
		}
		return usr;
	}

	public List<Users> searchUser(String username) {
		// TODO Auto-generated method stub
		ArrayList<Users> al = new ArrayList<>();
		Users usr = ur.findByUsername(username);
		if (usr != null) {
			al.add(usr);
		}
		return al;
	}

	@Override
	public String updateUsers(Users u) {
		// TODO Auto-generated method stub
		String res = "";
		Users user;
		Users usr = ur.findByUsername(u.getUsername());
		if (u.getSpc() != null) {
			usr.setSpc(u.getSpc());
		}
		if (u.getAvltime() != null) {
			usr.setAvltime(u.getAvltime());
		}
		if (u.getRole() != null) {
			usr.setRole(u.getRole());
		}
		if (u.getEmail() != null) {
			if (ur.findByEmail(u.getEmail()) == null) {
				usr.setEmail(u.getEmail());
				ur.save(usr);
			} else {
				res += "#Email ";
			}
		}
		if (u.getMobileNo() != null) {
			user = ur.findByMobileNo(u.getMobileNo());
			if (user == null) {
				usr.setMobileNo(u.getMobileNo());
				ur.save(usr);
			} else {
				res += "#Mobile No ";
			}
		}
		ur.save(usr);
		if (res != "" || res.length() != 0) {
			return "You can't use" + res;
		} else {
			return "Updated";
		}
	}

	@Override
	public String updatePass(Users u) {
		Users usr = ur.findByUsername(u.getUsername());
		System.out.println(usr);
		if (usr == null) {
			return "User dosen't Exist";
		} else {
			if (u.getPassword().equals(usr.getPassword())) {
				return "Your password Must not same as old password";
			} else {
				usr.setPassword(u.getPassword());
				ur.save(usr);
				return "Updated";
			}
		}
	}

	public List<Users> allDoc() {
		// TODO Auto-generated method stub
		ArrayList<Users> doc = new ArrayList<Users>();
		for (Users u : ur.findAll()) {
			if (u.getRole().equals("Doctor")) {
				doc.add(u);
			}
		}
		return doc;
	}

	public List<Users> findDoc(String type) {
		// TODO Auto-generated method stub
		ArrayList<Users> spc = new ArrayList<Users>();
		List<Users> doc = allDoc();
		if (doc == null) {
			return null;
		} else {
			for (Users u : doc) {
				try {
					if (u.getSpc().equals(type)) {
						spc.add(u);
					}
					if (u.getUsername().equals(type)) {
						spc.add(u);
					}
				} catch (Exception e) {
					if (u.getUsername().equals(type)) {
						spc.add(u);
					}
				}
			}
			return spc;
		}
	}

	public List<Users> fevDoc(String username) {
		Users u = ur.findByUsername(username);
		// TODO Auto-generated method stub
		return u.getFev();
	}

	public void addFevDoc(String username, String doc) {
		Users u = ur.findByUsername(username);
		Users user = ur.findByUsername(doc);
		List<Users> usr = u.getFev();
		usr.add(user);
		u.setFev(usr);
		ur.save(u);
	}

	public void removeFevDoc(String username, String doc) {
		Users usr = ur.findByUsername(username);
		ArrayList<Users> fev = new ArrayList<>();
		for (Users u : fevDoc(username)) {
			if (!u.getUsername().equals(doc)) {
				fev.add(u);
			}
		}
		usr.setFev(fev);
		ur.save(usr);
	}

	public boolean isfev(String username, String doc) {
		for (Users u : fevDoc(username)) {
			if (u.getUsername().equals(doc)) {
				return true;
			}
		}
		return false;
	}

	
}
