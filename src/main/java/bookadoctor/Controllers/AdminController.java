package bookadoctor.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookadoctor.Entitys.Users;
import bookadoctor.Repositories.MessageRepository;
import bookadoctor.Repositories.UsersRepository;
import bookadoctor.Services.ServicesInterfaces.NumaricData;

@RestController
@RequestMapping
@CrossOrigin("*")
public class AdminController {
@Autowired
UsersRepository ur;
@Autowired
MessageRepository mr;
NumaricData nm=new NumaricData();
@GetMapping("admin/numdata")
public NumaricData getData() {
	List<Users> users=ur.findByRole("Admin");
	ArrayList<String> al=new ArrayList<>();
	for(Users u:users) {
		al.add(u.getUsername());
	}
	nm.setAdmNames(al);
	nm.setAdmins(users.size());
	nm.setDocs(ur.findByRole("Doctor").size());
	nm.setUsers(ur.findByRole("User").size());
	nm.setTotal(ur.findAll().size());
	nm.setMsgs(mr.findAll().size());
	return nm;
}
}
