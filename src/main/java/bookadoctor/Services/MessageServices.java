package bookadoctor.Services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookadoctor.Entitys.Messages;
import bookadoctor.Repositories.MessageRepository;
import bookadoctor.Services.ServicesInterfaces.MessageServiceInterface;

@Service
public class MessageServices implements MessageServiceInterface{
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy 'at' HH:mm");
	@Autowired
	MessageRepository mr;
	@Autowired
	UsersServices ur;
	@Override
	public String addMessage(Messages m) {
		// TODO Auto-generated method stub
		try {
			m.setTime(LocalDateTime.now().format(formatter));
			mr.save(m);
			return "Sent";
		}catch (Exception e) {
			return "Server Error";
		}
	}

	@Override
	public String deleteMessage(Messages m) {
		// TODO Auto-generated method stub
		try {
			mr.deleteById(m.getMid());
			return "deleted";
		}catch (Exception e) {
			return "Server Error";
		}
	}

	@Override
	public List<Messages> allMessage() {
		// TODO Auto-generated method stub
		return mr.findAll();
	}

	@Override
	public List<Messages> getMessage(Messages m) {
		// TODO Auto-generated method stub
		ArrayList<Messages> al=new ArrayList<Messages>();
		try {
			al.add(mr.findById(Long.parseLong(m.getUser())).get());
		} catch (Exception e) {
			al.addAll(mr.findByUser(m.getUser()));
		}
		return al;
	}

//	public DataInNumaric dataInNumaric() {
//		DataInNumaric dn=new DataInNumaric();
//		dn.setNoMsgs(mr.findAll().size());
//		dn.setNoItems(ir.findAll().size());
//		dn.setNoUsers(ur.findAll().size());
//		// TODO Auto-generated method stub
//		return dn;
//	}

}
