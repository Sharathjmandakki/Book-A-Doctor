package bookadoctor.Controllers;
import java.sql.Blob;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bookadoctor.Entitys.Images;
import bookadoctor.Entitys.Users;
import bookadoctor.Services.ImagesServeices;
import bookadoctor.Services.UsersServices;

@CrossOrigin("*")
@RestController
@RequestMapping
public class UsersController {
	@Autowired
	UsersServices us;
	
	@Autowired
	ImagesServeices is;
	@PostMapping("login")
	public List<String> login(@RequestBody Users u){
		return us.Login(u);
	}
	
	
	@PostMapping("register")
	public String addUser(@RequestBody Users u) {
		return us.addUsers(u);
	}
	@PostMapping("updatepass")
	public String updatepass(@RequestBody Users u) {
		return us.updatePass(u);
	}
	@PostMapping("updateuser")
	public String updateUsers(@RequestBody Users u) {
		return us.updateUsers(u);
	}
	@GetMapping("allusers")
	public List<Users> allUsers(){
		return us.allUsers();
	}
	@GetMapping("serachUser/{username}")
	public List<Users> SearchUser(@PathVariable String username){
		return us.searchUser(username);
	}
	@DeleteMapping("deleteUser/{uid}")
	public void deletedUser(@PathVariable long uid){
		us.deletedUser(uid);
	}
	// Images............
	
	
	@PostMapping("updateimg")
	public String updateImage(@RequestParam("username") String username,
            @RequestParam("image") MultipartFile image) {
		try {
			 byte[] bytes = image.getBytes();
		     Blob img = new SerialBlob(bytes);
			return is.updateImages(username,img);	
		}catch (Exception e) {
			// TODO: handle exception
			return "Image cant be updated" + e;
		}
	}
	
	@GetMapping("/users/{username}/image")
    public ResponseEntity<byte[]> getUserImage(@PathVariable String username) {
        Optional<byte[]> imageBytes = is.getUserImage(username);
        if (imageBytes!=null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "image/jpeg");
            return ResponseEntity.ok().headers(headers).body(imageBytes.get());
        } else {
            return null;
        }
    }
    
//     Doctor
    @GetMapping("/doc/{username}/spc")
    public List<Users> getByType(@PathVariable String username) {
        return us.findDoc(username);
    }
    @GetMapping("alldoc")
    public List<Users> allDoc(){
    	return us.allDoc();
    }
    @GetMapping("/addfev/{username}/doc/{email}")
    public String addFevDoc(@PathVariable String username,@PathVariable String email){
    	us.addFevDoc(username,email);
    	return "Added";
    }
    @GetMapping("/removefev/{username}/doc/{email}")
    public String removeFevDoc(@PathVariable String username,@PathVariable String email){
    	us.removeFevDoc(username,email);
    	return "Removed";
    }
    @GetMapping("/fevdoc/{username}")
    public List<Users> fevDoc(@PathVariable String username){
    	return us.fevDoc(username);
    }
    @GetMapping("/isfev/{username}/doc/{email}")
    public boolean isfevDoc(@PathVariable String username,@PathVariable String email){
    	return us.isfev(username,email);
    }
}