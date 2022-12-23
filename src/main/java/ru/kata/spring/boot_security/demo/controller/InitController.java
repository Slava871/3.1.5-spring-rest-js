package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.services.security.AccountDetails;
import ru.kata.spring.boot_security.demo.util.UserErrorResponse;
import ru.kata.spring.boot_security.demo.util.UserNotFoundException;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Controller
public class InitController {
    private final UserService userservice;
    private final RoleDao roleDao;

    @Autowired
    public InitController(UserService userservice, RoleDao roleDao) {
        this.userservice = userservice; this.roleDao = roleDao;
    }


    @GetMapping("/init")
    public String  InitUser() {

        if (userservice.listUsers().isEmpty()) {
            roleDao.initRoles();
            userservice.addUser(new UserDTO("admin", "admin", new Long[]{(long) 1}));

        }
        return "redirect:/";
    }
}

