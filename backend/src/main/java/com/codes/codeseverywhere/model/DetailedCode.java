package com.codes.codeseverywhere.model;

public class DetailedCode {
    private Codes codes;
    private Login login;
    public String toString(){
        this.codes.toString();
        this.login.toString();
        return null;
    }

    DetailedCode(){

    }

    DetailedCode(Codes codes, Login login){
        this.codes = codes;
        this.login = login;
    }

    public Codes getCodes() {
        return codes;
    }

    public void setCodes(Codes codes) {
        this.codes = codes;
    }
    public Login getLogin() {
        return login;
    }
    public void setLogin(Login login) {
        this.login = login;
    }
}
