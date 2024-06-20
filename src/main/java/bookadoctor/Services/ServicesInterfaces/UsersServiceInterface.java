package bookadoctor.Services.ServicesInterfaces;
import java.util.List;

import bookadoctor.Entitys.Users;

public interface UsersServiceInterface {
	public List<String> Login(Users u);
	public String addUsers(Users u);
	public List<Users> allUsers();
	public Users getUser(Users u);
	String updateUsers(Users u);
	String updatePass(Users u);
}
