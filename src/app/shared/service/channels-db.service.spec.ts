import { TestBed } from '@angular/core/testing';

import { ChannelDbService } from './channels-db.service';

describe('ChannelsDbService', () => {
  let service: ChannelDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
