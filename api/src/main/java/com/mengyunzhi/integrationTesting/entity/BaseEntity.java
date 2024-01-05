package com.mengyunzhi.integrationTesting.entity;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

@MappedSuperclass
@Data
public class BaseEntity<ID extends Serializable> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected Timestamp createTime = new Timestamp(System.currentTimeMillis());

    @Column(nullable = false)
    protected Long deleteAt = 0L;

    @JsonView(BaseEntity.DeletedJsonView.class)
    protected Boolean deleted = false;

    @UpdateTimestamp
    protected Timestamp updateTime = new Timestamp(System.currentTimeMillis());

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseEntity that = (BaseEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public interface DeleteAtJsonView {
    }

    public interface DeletedJsonView {
    }

}
