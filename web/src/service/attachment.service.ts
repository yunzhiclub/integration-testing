import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attachment} from "../entity/attachment";

/**
 * 文件上传service
 */
@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  public static prefix = 'attachment/';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 上传文件
   * @param file 文件
   */
  upload(file: File): Observable<HttpEvent<Attachment>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<Attachment>(`attachment/upload`,
      formData, {reportProgress: true, observe: 'events'});
  }

  /**
   * 图片上传
   */
  imageUpload(file: File): Observable<HttpEvent<Attachment>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<Attachment>('attachment/image', formData, {reportProgress: true, observe: 'events'});
  }

}

