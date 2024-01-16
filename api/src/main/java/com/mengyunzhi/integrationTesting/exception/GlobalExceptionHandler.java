package com.mengyunzhi.integrationTesting.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

/**
 * 全局异常处理器.
 *
 * @author yz
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private final HashMap<Class<? extends Exception>, ErrorMessage> exceptionStatusMap = new HashMap<Class<? extends Exception>, ErrorMessage>();

    public GlobalExceptionHandler() {
        this.exceptionStatusMap.put(AccessDeniedException.class, new ErrorMessage("access deny", HttpStatus.FORBIDDEN, 40301));
        this.exceptionStatusMap.put(DataFormatException.class, new ErrorMessage("input validate error", HttpStatus.BAD_REQUEST, 40001));
        this.exceptionStatusMap.put(ValidationException.class, new ErrorMessage("input validate error", HttpStatus.BAD_REQUEST, 40002));
        this.exceptionStatusMap.put(HttpMessageNotReadableException.class, new ErrorMessage("json parse error", HttpStatus.BAD_REQUEST, 40003));
        this.exceptionStatusMap.put(MethodArgumentNotValidException.class,
            new ErrorMessage("input validate error", HttpStatus.BAD_REQUEST, 40004, e -> {
                MethodArgumentNotValidException ex = (MethodArgumentNotValidException) e;
                ArrayList<String> errors = new ArrayList<>();
                for (FieldError error : ex.getBindingResult().getFieldErrors()) {
                    errors.add(error.getField() + ": " + error.getDefaultMessage());
                }
                for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
                    errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
                }
                return errors;
            }));
        this.exceptionStatusMap.put(FileTypeNotSupportException.class, new ErrorMessage("file type not allow", HttpStatus.BAD_REQUEST, 40005));
        this.exceptionStatusMap.put(EntityNotFoundException.class, new ErrorMessage("resource not found or you don't have access", HttpStatus.NOT_FOUND, 40401));
        this.exceptionStatusMap.put(NotSupportedException.class, new ErrorMessage("request not acceptable", HttpStatus.NOT_ACCEPTABLE, 40601));
        this.exceptionStatusMap.put(IllegalStateException.class, new ErrorMessage("request status has changed", HttpStatus.PRECONDITION_FAILED, 41201));
        this.exceptionStatusMap.put(TimelinessException.class, new ErrorMessage("request expired", HttpStatus.GONE, 41001));
        this.exceptionStatusMap.put(RuntimeException.class, new ErrorMessage("runtime exception", HttpStatus.SERVICE_UNAVAILABLE, 50001));
        this.exceptionStatusMap.put(IllegalArgumentException.class, new ErrorMessage("illegal argument exception", HttpStatus.SERVICE_UNAVAILABLE, 50002));
        this.exceptionStatusMap.put(ServiceNotRegisteredException.class, new ErrorMessage("service not register exception", HttpStatus.SERVICE_UNAVAILABLE, 50003));
        this.exceptionStatusMap.put(JpaObjectRetrievalFailureException.class, new ErrorMessage("Unable to find Entity with id (don't use @Where(clause = \"deleted = false\") for Entity)", HttpStatus.SERVICE_UNAVAILABLE, 50004));
        this.exceptionStatusMap.put(NullPointerException.class, new ErrorMessage("null pointer exception, plz contact us", HttpStatus.SERVICE_UNAVAILABLE, 50005));
        this.exceptionStatusMap.put(Exception.class, new ErrorMessage("exception", HttpStatus.SERVICE_UNAVAILABLE, 50000));
    }

    /**
     * runtime异常.
     *
     * @param request   请求
     * @param exception 异常
     * @return 异常处理器
     */
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ErrorMessage> runtimeExceptionHandler(HttpServletRequest request, Exception exception) {
        if (exception.getClass().equals(RuntimeException.class) || exception.getClass().equals(Exception.class)) {
            logger.error("程序运行异常: 主机 {} 调用地址 {} 错误信息 {}",
                request.getRemoteHost(), request.getRequestURL(), exception.getMessage());
            exception.printStackTrace();
        }

        ErrorMessage errorMessage;
        if (!this.exceptionStatusMap.containsKey(exception.getClass())) {
            logger.warn("未找到" + exception.getClass() + "的异常处理器，请添加");
            if (exception instanceof RuntimeException) {
                errorMessage = this.exceptionStatusMap.get(RuntimeException.class);
            } else {
                errorMessage = this.exceptionStatusMap.get(Exception.class);
            }
        } else {
            errorMessage = this.exceptionStatusMap.get(exception.getClass());
        }

        return new ResponseEntity<>(errorMessage.addException(exception), errorMessage.httpStatus);
    }

    public static class ErrorMessage {
        private String message;

        private int status;

        private List<String> errors = new ArrayList<>();

        @JsonIgnore
        private final HttpStatus httpStatus;

        @JsonIgnore
        private final GetErrors getErrorsFn;

        public ErrorMessage(String message, HttpStatus httpStatus, int status) {
            this(message, httpStatus, status, e -> e.getMessage().isEmpty() ? new ArrayList<>() : Collections.singletonList(e.getMessage()));
        }

        public ErrorMessage(String message, HttpStatus httpStatus, int status, GetErrors getErrorsFn) {
            this.message = message;
            this.httpStatus = httpStatus;
            this.status = status;
            this.getErrorsFn = getErrorsFn;
        }

        public ErrorMessage addException(Exception exception) {
            this.setErrors(this.getErrorsFn.getErrors(exception));
            return this;
        }

        public int getStatus() {
            return status;
        }

        public void setStatus(int status) {
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public List<String> getErrors() {
            return errors;
        }

        public void setErrors(List<String> errors) {
            this.errors = errors;
        }

        public interface GetErrors {
            List<String> getErrors(Exception e);
        }
    }
}
