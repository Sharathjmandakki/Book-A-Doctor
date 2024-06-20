package bookadoctor.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bookadoctor.Entitys.Appointment;
import bookadoctor.Entitys.Users;
import bookadoctor.Entitys.VisitedPatient;
import bookadoctor.Repositories.AppointmentRepository;
import bookadoctor.Repositories.UsersRepository;
import bookadoctor.Repositories.VisitedPatientRepository;
import bookadoctor.Services.ServicesInterfaces.AppointmentServicesInterface;

@Service
public class AppointmentServices implements AppointmentServicesInterface {
	@Autowired
	AppointmentRepository ar;
	@Autowired
	UsersRepository ur;
	@Autowired
	VisitedPatientRepository vpr;
	@Override
	public String addAppointment(Appointment a) {
		Users u=ur.findByUsername(a.getUsers());
		a.setMobile(u.getMobileNo());
		ar.save(a);
		// TODO Auto-generated method stub
		return "Saved";
	}

	@Override
	public String deleteAppointment(Long id) {
		try{
			ar.deleteById(id);
			// TODO Auto-generated method stub
			return "deleted";
		}catch (Exception e) {
			// TODO: handle exception
			return "Error";
		}
	}
	
	@Override
	public List<Appointment> usersAppointment(String username) {
		// TODO Auto-generated method stub
		return ar.findByUsers(username);
	}

	@Override
	public List<Appointment> docAppointment(String username) {
		// TODO Auto-generated method stub
		return ar.findByDoctor(username);
	}

	public String visitAppointment(Long id,String spc,String tab) {
		Appointment a=ar.findById(id).get();
		VisitedPatient vp=new VisitedPatient();
		vp.setDoctor(a.getDoctor());
		vp.setOid(a.getId());
		vp.setMobile(a.getMobile());
		vp.setSpc(spc);
		vp.setUsers(a.getUsers());
		vp.setTime(a.getTime());
		vp.setTabs(tab);
		vpr.save(vp);
		ar.deleteById(id);
		return "Done";
	}

	public List<VisitedPatient> usersVistAppointment(String users) {
		// TODO Auto-generated method stub
		return vpr.findByUsers(users);
	}

	public List<VisitedPatient> visitAppointment(String doctor) {
		// TODO Auto-generated method stub
		return vpr.findByDoctor(doctor);
	}

	public List<Long> visitNumAppointment(String doctor) {
		ArrayList<Long> al=new ArrayList<>();
		long l1=ar.findByDoctor(doctor).size();
		long l2=vpr.findByDoctor(doctor).size();
		al.add(l1);
		al.add(l2);
		return al;
	}

	public List<Appointment> searchdocAppointment(String doctor) {
		ArrayList<Appointment> al=new ArrayList<>();
		List<Appointment> a=ar.findByDoctor(doctor);
		if(a!=null||a.size()!=0) {
			al.addAll(a);
		}
		try {
			long id=Long.parseLong(doctor);
			Appointment b=ar.findById(id).get();
			if(b!=null) {
				al.add(b);
			}
			return al;
		}catch (Exception e) {
			// TODO: handle exception
			return al;
		}
	}

	public List<VisitedPatient> searchvisitAppointment(String doctor) {
		ArrayList<VisitedPatient> al=new ArrayList<>();
		List<VisitedPatient> a=vpr.findByDoctor(doctor);
		if(a!=null||a.size()!=0) {
			al.addAll(a);
		}
		try {
			long id=Long.parseLong(doctor);
			List<VisitedPatient> b=vpr.findByOid(id);
			if(b!=null) {
				al.addAll(b);
			}

			return al;
		}catch (Exception e) {
			// TODO: handle exception
			return al;
		}
	}

}
