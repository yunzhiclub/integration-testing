package com.mengyunzhi.integrationTesting.exception;

/**
 * 数据格式异常
 */
public class DataFormatException extends RuntimeException {
  public DataFormatException(String message) {
    super(message);
  }
}
