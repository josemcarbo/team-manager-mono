import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersRegisterDto, UsersRegisterResponseDto } from './users.dto';
import { UsersService } from './users.service';
import { IUser } from './users.interface';
import { Public } from '../auth/decorators/public.decorator';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: UsersRegisterDto })
  @ApiResponse({ status: 201, type: UsersRegisterResponseDto })
  @ApiOperation({ description: 'Register new user' })
  @Public()
  @Post('/signup')
  signup(@Body() user: UsersRegisterDto): Promise<IUser> {
    return this.usersService.signUp(user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UsersRegisterResponseDto })
  @ApiOperation({ description: 'Get one user' })
  @Get('/')
  find(@Req() request: any): Promise<IUser> {
    return this.usersService.findOne(request.user.id);
  }
}
