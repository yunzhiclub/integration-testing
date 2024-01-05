package com.mengyunzhi.integrationTesting.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mengyunzhi.integrationTesting.typeadapter.TimestampLongFormatTypeAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.sql.Timestamp;
import java.util.List;

/**
 * web配置
 */
@EnableWebMvc
@Configuration
public class WebConfig implements WebMvcConfigurer {


    @Bean
    public Gson gson() {
        return new GsonBuilder()
                .registerTypeAdapter(Timestamp.class, new TimestampLongFormatTypeAdapter())
                .serializeNulls()
                .create();
    }


    /**
     * 配置JsonView
     * defaultViewInclusion(true) 允许您选择在序列化时包括或排除对象的特定属性
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        final ObjectMapper mapper = Jackson2ObjectMapperBuilder.json().defaultViewInclusion(true).build();
        converters.add(new MappingJackson2HttpMessageConverter(mapper));
    }


    /**
     * 不区分大小写
     *
     * @param configurer 配置信息
     */
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        final AntPathMatcher pathMatcher = new AntPathMatcher();
        pathMatcher.setCaseSensitive(false);
        configurer.setPathMatcher(pathMatcher);
    }
}
