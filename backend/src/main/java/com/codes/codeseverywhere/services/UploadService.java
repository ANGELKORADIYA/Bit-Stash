package com.codes.codeseverywhere.services;

import com.codes.codeseverywhere.model.Codes;
import com.codes.codeseverywhere.repositeries.UploadRepo;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UploadService {
    final UploadRepo uploadRepo;

    public UploadService(UploadRepo uploadRepo) {
        this.uploadRepo = uploadRepo;
    }


    public void saveDB(Codes schema) {
        if (schema.getStatus() == null) {
            schema.setStatus(schema.isVisibility() ? "PUBLIC" : "PRIVATE");
        }
        uploadRepo.save(schema);
    }

    public List<Codes> getCodes(int size) {
        return this.uploadRepo.findRandomCodes(size);
    }

    public List<Codes> getCodesById(String username) {
        return this.uploadRepo.findByUserExcludeArchive(username);
    }

    public List<Codes> getCodesByStatus(String username, String status) {
        if ("ALL".equalsIgnoreCase(status)) {
            return uploadRepo.findByUserExcludeArchive(username);
        }
        if ("SHARED".equalsIgnoreCase(status)) {
            // This might mean codes SHARED BY ME or SHARED WITH ME. 
            // Usually "User Posts" filters refer to what the user OWN.
            // But let's assume it's status = 'SHARED'
            return uploadRepo.findByUserAndStatus(username, "SHARED");
        }
        return uploadRepo.findByUserAndStatus(username, status.toUpperCase());
    }

    public List<Codes> getSharedWithMe(String email) {
        return uploadRepo.findSharedWithUser(email);
    }

    public Codes archiveCode(Long id, String username) {
        Codes code = uploadRepo.findById(id).orElse(null);
        if (code != null && code.getUsername().equals(username)) {
            code.setStatus("ARCHIVE");
            return uploadRepo.save(code);
        }
        return null;
    }

    public Codes unarchiveCode(Long id, String username) {
        Codes code = uploadRepo.findById(id).orElse(null);
        if (code != null && code.getUsername().equals(username)) {
            if (!code.getSharedWith().isEmpty()) {
                code.setStatus("SHARED");
            } else {
                code.setStatus(code.isVisibility() ? "PUBLIC" : "PRIVATE");
            }
            return uploadRepo.save(code);
        }
        return null;
    }

    public Codes grantAccess(Long id, String ownerUsername, String shareEmail) {
        Codes code = uploadRepo.findById(id).orElse(null);
        if (code != null && code.getUsername().equals(ownerUsername)) {
            code.getSharedWith().add(shareEmail);
            code.setStatus("SHARED");
            return uploadRepo.save(code);
        }
        return null;
    }

    public Codes revokeAccess(Long id, String ownerUsername, String shareEmail) {
        Codes code = uploadRepo.findById(id).orElse(null);
        if (code != null && code.getUsername().equals(ownerUsername)) {
            code.getSharedWith().remove(shareEmail);
            if (code.getSharedWith().isEmpty()) {
                code.setStatus(code.isVisibility() ? "PUBLIC" : "PRIVATE");
            }
            return uploadRepo.save(code);
        }
        return null;
    }
}
