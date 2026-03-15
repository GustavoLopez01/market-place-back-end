
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './isPublic';
import type { Response, Request } from 'express';
import { isEmpty } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Res() res: Response
  ) {
    if (isEmpty(signInDto?.username) || isEmpty(signInDto?.password)) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: 'Existen campos vaciós o incorrectos.'
      })
    }

    const response = await this.authService.signIn(signInDto.username, signInDto.password);
    return res.status(HttpStatus.OK).json({
      token: response.access_token
    });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    // return req.user;
  }
}
