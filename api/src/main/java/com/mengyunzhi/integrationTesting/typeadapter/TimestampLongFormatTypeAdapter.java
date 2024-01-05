package com.mengyunzhi.integrationTesting.typeadapter;


import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.sql.Timestamp;

/**
 * 适用于Gson的时间戳与Long类型的转换器
 */
public class TimestampLongFormatTypeAdapter extends TypeAdapter<Timestamp> {

    /**
     * 把时间戳传换为Json
     */
    @Override
    public void write(JsonWriter out, Timestamp value) throws IOException {
        if (value != null) {
            out.value(value.getTime());
        } else {
            out.nullValue();
        }
    }


    /**
     * 把json传换为时间戳
     */
    @Override
    public Timestamp read(JsonReader jsonReader) throws IOException {
        return new Timestamp(jsonReader.nextLong());
    }
}
