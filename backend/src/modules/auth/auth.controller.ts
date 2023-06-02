import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthLoginRequestDto, AuthLoginResponseDto } from './auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Login with email and password' })
  @ApiBody({ type: AuthLoginRequestDto })
  @ApiResponse({ status: 201, type: AuthLoginResponseDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req): Promise<any> {
    const { user } = req;
    return this.authService.login(user);
  }
}
