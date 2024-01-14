package com.mengyunzhi.integrationTesting.exception;

/**
 * 文件后缀名(例： .txt)不支持，用于对上传文件类型的校验
 */
public class FileExtIsNotSupportException extends RuntimeException {
    public FileExtIsNotSupportException(String message) {
        super(message);
    }
}
