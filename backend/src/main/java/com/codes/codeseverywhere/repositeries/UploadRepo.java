package com.codes.codeseverywhere.repositeries;

import com.codes.codeseverywhere.model.Codes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UploadRepo extends JpaRepository<Codes,Integer > {
    @Query("select u from Codes u where u.visibility = true order by RAND() limit :size")
    List<Codes> findRandomCodes(int size);

    @Query("select u from Codes u where u.username = :username")
    List<Codes> findByUser(String username);
}
