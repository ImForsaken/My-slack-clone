import { TestBed } from '@angular/core/testing';

import { DirectMessagesServiceService } from '../../direct-messages-service.service';

describe('DirectMessagesServiceService', () => {
  let service: DirectMessagesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectMessagesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
