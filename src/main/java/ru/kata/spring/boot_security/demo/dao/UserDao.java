package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    void addUser(UserDTO user);

    List<User> listUsers();

    User getUser(Long id);

    void editUser(Long id, UserDTO user);

    void deleteUser(Long id);

    List<User> findByUsername(String username);
}
