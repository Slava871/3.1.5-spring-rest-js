package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public String showAdminPage(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("users", userService.allUsers());
        model.addAttribute("user", user);
        Set<Role> set = new HashSet<>();
        set.add(new Role(1L, "ROLE_USER"));
        set.add(new Role(2L, "ROLE_ADMIN"));
        model.addAttribute("roles", set);
        return "adminPage";
    }

    @GetMapping("/add")
    public String newUserPage(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user);
        Set<Role> set = new HashSet<>();
        Role role1 = new Role(1L, "ROLE_USER");
        Role role2 = new Role(2L, "ROLE_ADMIN");
        set.add(role1);
        set.add(role2);
        model.addAttribute("roles", set);
        return "newUser";
    }

    @PostMapping("/new")
    public String createUser(@ModelAttribute("user") User user) {
        Set<Role> set = user.getRoles();
        Object[] arr = set.toArray();
        Role r = (Role)arr[0];
        user.setRoles(Collections.singleton((Role)arr[0]));
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PutMapping("/{id}/update")
    public String updateUser(@ModelAttribute("user") User user, Model model) {
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}/delete")
    public String deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
