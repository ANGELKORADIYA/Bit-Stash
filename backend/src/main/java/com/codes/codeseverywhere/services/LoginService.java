package com.codes.codeseverywhere.services;

import com.codes.codeseverywhere.model.Login;
import com.codes.codeseverywhere.repositeries.LoginRepo;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class LoginService {
    final LoginRepo loginRepo;
    public LoginService(LoginRepo loginRepo) {
        this.loginRepo = loginRepo;
    }
    public Login loginSignup(Login user) {
        Login authingUser = loginRepo.findByEmailUsername(user.getUsername());
        if(authingUser==null){
                if(user.getEmail()==null && user.getUsername()==null || user.getPassword()==null){
                    return null;
                }
                if(user.getEmail()==null){
                    user.setEmail(user.getUsername());
                }
                if(user.getUsername()==null){
                    user.setUsername(user.getEmail());
                }
                loginRepo.save(user);
            return user;

        }
        else{
            if(Objects.equals(authingUser.getPassword(), user.getPassword())){
                return authingUser;
            }else{
                return null;
            }
        }

    }

    public String generateUniqueEmail() {
        String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        java.util.Random random = new java.util.Random();
        String email;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 10; i++) {
                sb.append(characters.charAt(random.nextInt(characters.length())));
            }
            email = sb.toString() + "@codes.com";
        } while (loginRepo.findByEmailUsername(email) != null);
        return email;
    }
}
