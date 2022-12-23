package ru.kata.spring.boot_security.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.Role;


import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;
@Repository
public class RoleDaoImpl implements  RoleDao {

    private final EntityManager entityManager;

    @Autowired
    public RoleDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Set<Role> getRoles(Long[] userRoles) {
        return (Set<Role>) entityManager.createQuery("select r from  Role r  where r.id in(:userRoles)").setParameter("userRoles", Arrays.asList(userRoles)).getResultStream().collect(Collectors.toSet());
    }

    @Override
    @Transactional
    public void initRoles() {

        entityManager.persist(new Role("ROLE_ADMIN"));
        entityManager.persist(new Role("ROLE_USER"));
    }

}


