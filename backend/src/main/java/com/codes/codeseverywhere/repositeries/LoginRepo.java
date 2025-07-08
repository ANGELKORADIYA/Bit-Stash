package com.codes.codeseverywhere.repositeries;

import com.codes.codeseverywhere.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoginRepo extends JpaRepository<Login, Integer> {

    @Query("select u from Login u where u.email = :username or u.username = :username")
    Login findByEmailUsername(String username);
}
