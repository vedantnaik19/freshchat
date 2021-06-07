import { TestBed } from '@angular/core/testing';

import { NgxFreshChatService } from './ngx-fresh-chat.service';

describe('NgxFreshChatService', () => {
  let service: NgxFreshChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFreshChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
