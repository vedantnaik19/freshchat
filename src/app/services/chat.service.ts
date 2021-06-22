import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  conversationId: string = "48176698-980d-4ca4-9fe3-f0a1693113c6";
  constructor(private http: HttpClient) { }

  retrieveConversation(): Observable<any> {
    let params = new HttpParams().set('items_per_page', 20);
    return this.http.get<any>(`${environment.freshChatUrl}/v2/conversations/${this.conversationId}/messages`, { params: params });
  }
}
