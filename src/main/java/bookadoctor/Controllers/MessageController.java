package bookadoctor.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookadoctor.Entitys.Messages;
import bookadoctor.Services.MessageServices;
@RestController
@RequestMapping
@CrossOrigin("*")
public class MessageController {
	@Autowired
	MessageServices ms;
	@PostMapping("addmsg")
	public String addMessage(@RequestBody Messages m) {
		return ms.addMessage(m);
	}
	@PostMapping("deletemsg")
	public String deleteMessage(@RequestBody Messages m) {
		return ms.deleteMessage(m);
	}
	@GetMapping("allmsg")
	public List<Messages> allMessages(){
		return ms.allMessage();
	}
	@PostMapping("getmsg")
	public List<Messages> getMessage(@RequestBody Messages m){
		return ms.getMessage(m);
	}
//	@GetMapping("numricData")
//	public DataInNumaric data() {
//		return ms.dataInNumaric();
//	}
}
