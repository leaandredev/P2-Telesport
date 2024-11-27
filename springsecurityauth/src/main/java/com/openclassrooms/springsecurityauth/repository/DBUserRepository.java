package com.openclassrooms.springsecurityauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.springsecurityauth.model.DBUser;

public interface DBUserRepository extends JpaRepository<DBUser, Integer> {
    public DBUser findByUsername(String username);
}
