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
}
