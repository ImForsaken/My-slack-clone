import { TestBed } from '@angular/core/testing';
import { DirectMessageDbService } from './direct-messages-db.service';


describe('DirectMessagesServiceService', () => {
  let service: DirectMessageDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectMessageDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
