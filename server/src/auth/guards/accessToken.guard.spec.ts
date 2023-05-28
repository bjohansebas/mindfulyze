import { AccessTokenGuard } from './accessToken.guard';

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new AccessTokenGuard()).toBeDefined();
  });
});
