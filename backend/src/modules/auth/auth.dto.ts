import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginRequestDto {
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @ApiProperty({
    minLength: 8,
    maxLength: 128,
    format: 'password',
  })
  password: string;
}

export class AuthLoginResponseDto {
  @ApiProperty()
  access_token: string;
}
