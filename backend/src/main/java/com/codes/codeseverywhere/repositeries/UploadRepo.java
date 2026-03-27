package com.codes.codeseverywhere.repositeries;

import com.codes.codeseverywhere.model.Codes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UploadRepo extends JpaRepository<Codes,Long > {
    @Query("select u from Codes u where u.status = 'PUBLIC' order by RANDOM() limit :size")
    List<Codes> findRandomCodes(int size);

    @Query("select u from Codes u where u.username = :username")
    List<Codes> findByUser(String username);

    @Query("select u from Codes u where u.username = :username and u.status = :status")
    List<Codes> findByUserAndStatus(String username, String status);

    @Query("select u from Codes u where u.username = :username and u.status <> 'ARCHIVE'")
    List<Codes> findByUserExcludeArchive(String username);

    @Query("select u from Codes u join u.sharedWith s where s = :email")
    List<Codes> findSharedWithUser(String email);
}
