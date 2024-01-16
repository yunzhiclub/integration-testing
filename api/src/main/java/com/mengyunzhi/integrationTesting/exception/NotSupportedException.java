package com.mengyunzhi.integrationTesting.exception;

/**
 * @author panjie 3792535@qq.com
 * @description 当前操作不被支持
 */
public class NotSupportedException extends RuntimeException {
  public NotSupportedException(String message) {
    super(message);
  }
}
