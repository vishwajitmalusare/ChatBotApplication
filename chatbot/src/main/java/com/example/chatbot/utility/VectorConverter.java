package com.example.chatbot.utility;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.postgresql.util.PGobject;

import java.sql.SQLException;

@Converter
public class VectorConverter implements AttributeConverter<String, Object> {

    @Override
    public Object convertToDatabaseColumn(String vector) {
        if (vector == null) return null;
        try {
            PGobject pgObject = new PGobject();
            pgObject.setType("vector");
            pgObject.setValue(vector);
            return pgObject;
        } catch (SQLException e) {
            throw new RuntimeException("Error converting vector to PGobject", e);
        }
    }

    @Override
    public String convertToEntityAttribute(Object dbData) {
        if (dbData == null) return null;
        return dbData.toString();
    }
}