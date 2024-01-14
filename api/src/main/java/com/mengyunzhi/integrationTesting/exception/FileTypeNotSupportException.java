package com.mengyunzhi.integrationTesting.exception;

/**
 * 文件类型不支持，用于对上传文件类型的校验
 *
 * @author panjie 3792535@qq.com
 * @date 2023/9/17
 */
public class FileTypeNotSupportException extends RuntimeException {
    public FileTypeNotSupportException(String message) {
        super(message);
    }
}
