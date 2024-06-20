package bookadoctor.Services.ServicesInterfaces;

import java.util.List;

import bookadoctor.Entitys.Messages;

public interface MessageServiceInterface {

public String addMessage(Messages m);
public String deleteMessage(Messages m);
public List<Messages> allMessage();
public List<Messages> getMessage(Messages m);

}
