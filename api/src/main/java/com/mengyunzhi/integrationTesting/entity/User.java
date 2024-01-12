package com.mengyunzhi.integrationTesting.entity;


import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import org.hibernate.annotations.SQLDelete;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.*;

/**
 * @author kexiaobin
 */
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"username", "deleteAt"})
        }
)
@Entity
@SQLDelete(sql = "update `user` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
public class User extends BaseEntity<Long> implements UserDetails {
    public static String ROLE_ADMIN = "role_admin";
    public static String ROLE_USER = "role_user";
    public static String PASSWORD = "yunzhi";

    @Getter
    private String name;

    @Getter
    private String username;

    @Getter
    @JsonView(PasswordJsonView.class)
    private String password;

    @Getter
    private static PasswordEncoder passwordEncoder;

    @Getter
    private String role;

    public void setRole(String role) {
        this.role = role;
    }

    @Getter
    @JsonView(ContactPhoneJsonView.class)
    private String contactPhone;

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public static void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        User.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = null;

        if (null != this.role) {
            authority = new SimpleGrantedAuthority(this.role);
        }
        return Collections.singleton(authority);
    }

    public void setPassword(String password) {
        if (User.passwordEncoder == null) {
            throw new RuntimeException("未设置User实体的passwordEncoder，请调用set方法设置");
        }
        this.password = User.passwordEncoder.encode(password);
    }


    public String getDirtyContactPhone() {
        if (null == this.contactPhone || "".equals(this.contactPhone)) {
            return "";
        } else {
            return this.contactPhone.replaceAll("(\\d{3})\\d{4}(\\d{3})", "$1****$2");
        }
    }

    public void setName(String name) {
        this.name = name;
    }

    private interface PasswordJsonView {}

    public static interface ContactPhoneJsonView {}

}

