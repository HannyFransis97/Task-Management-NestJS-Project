import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredenticalsDto } from './dto/auth.credenticals.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepositort: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredenticalsDto: AuthCredenticalsDto): Promise<void> {
    return this.userRepositort.signUp(authCredenticalsDto);
  }

  async signIn(
    authCredenticalsDto: AuthCredenticalsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepositort.validateUserPassword(
      authCredenticalsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }
}
