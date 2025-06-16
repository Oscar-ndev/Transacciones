package com.example.api1.security;

import com.example.api1.exceptions.SecretException;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class AES {

    private static final String SECRET = "qM9zL!r3Yv@8XpA2Bv#7Nc$dEw4JfTgH";

    public static String desencriptar(String llaveEncriptada){
        try {
            SecretKeySpec key = new SecretKeySpec(SECRET.getBytes(), "AES");

            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, key);

            byte[] decoded = Base64.getDecoder().decode(llaveEncriptada);
            byte[] descrypted = cipher.doFinal(decoded);

            return new String(descrypted);

        }catch (Exception e){
            throw  new SecretException("El secreto proporcionado no es válido");
        }
    }
}
