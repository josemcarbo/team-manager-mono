import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  public async encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async compare(password, hash): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
