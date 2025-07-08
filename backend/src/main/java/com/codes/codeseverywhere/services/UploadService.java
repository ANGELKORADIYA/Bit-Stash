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
        uploadRepo.save(schema);
    }

    public List<Codes> getCodes(int size) {
        return this.uploadRepo.findRandomCodes(size);
    }

    public List<Codes> getCodesById(String username) {
        return this.uploadRepo.findByUser(username);
    }
}
