import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredenticalsDto } from './dto/auth.credenticals.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredenticalsDto: AuthCredenticalsDto,
  ): Promise<void> {
    console.log(authCredenticalsDto);
    return this.authService.signUp(authCredenticalsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredenticalsDto: AuthCredenticalsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredenticalsDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
