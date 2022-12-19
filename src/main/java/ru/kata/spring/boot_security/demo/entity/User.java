package ru.kata.spring.boot_security.demo.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "t_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String lastname;

    private String email;

    private Long age;

    private String password;

    @Transient
    private String passwordConfirm;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Role> roles;

    public User() {
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    //получить множество ролей пользов
    public Set<Role> getRoles() {
        return roles;
    }

    //получить конректную роль пользов
    public String getUserRole() {
        StringBuilder sbld = new StringBuilder();
        List<Role> roleList = new ArrayList<>();
        //получим роли пользователя и запишем их в массив объектов
        Set<Role> set = this.getRoles();
        Object[] arr = set.toArray();
        //чтобы избежать проблем с кастингом, перепишем роли из массива об-в в лист Ролей
        for (Object o : arr) {
            roleList.add((Role) o);
        }
        //StringBuilder
        for (Role r : roleList) {
            if (r.getName().equals("ROLE_USER")) {
                sbld.append("USER").append(" ");
            } else if (r.getName().equals("ROLE_ADMIN")) {
                sbld.append("ADMIN").append(" ");
            }
        }
        return sbld.toString().trim();
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}
