package ru.kata.spring.boot_security.demo.controller;

import ru.kata.spring.boot_security.demo.entity.User;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class UserController {

    @GetMapping(value = "login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("user")
    public String showUserInfo(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user);
        return "userPage";
    }
}