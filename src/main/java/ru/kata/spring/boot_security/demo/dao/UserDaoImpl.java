package ru.kata.spring.boot_security.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    private final EntityManager entityManager;
    private final RoleDao roleDao;

    @Autowired
    public UserDaoImpl(EntityManager entityManager, RoleDao roleDao) {

        this.entityManager = entityManager;
        this.roleDao = roleDao;
    }

    @Override
    public void addUser(UserDTO user) {

        User newUser = new User(user.getUsername(),
                user.getPassword(),
                user.getFirstName(),
                user.getSecondName(),
                user.getAge(),
                user.getEmail(),
                roleDao.getRoles(user.getRoles()));
        entityManager.persist(newUser);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<User> listUsers() {

        return entityManager.createQuery(" FROM User").getResultList();

    }

    @Override
    public User getUser(Long id) {

        return entityManager.find(User.class, id);
    }

    @Override
    public void editUser(Long id, UserDTO user) {

        User edit = entityManager.find(User.class, id);
        edit.setUsername(user.getUsername());
        edit.setFirstName(user.getFirstName());
        edit.setSecondName(user.getSecondName());
        edit.setAge(user.getAge());
        edit.setEmail(user.getEmail());
        edit.setPassword(user.getPassword());
        edit.setRoles(roleDao.getRoles(user.getRoles()));
    }

    @Override
    public void deleteUser(Long id) {

        entityManager.remove(entityManager.find(User.class, id));
    }

    @Override
    public List<User> findByUsername(String username) {

        return entityManager.createQuery("select u from User u join fetch u.roles where u.username =:username").setParameter("username", username).getResultList();
    }
}
