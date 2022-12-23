package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
    void addUser(UserDTO user);

    List<User> listUsers();

    User getUser(Long id);

    void editUser(Long id, UserDTO user);

    void deleteUser(Long id);

}

