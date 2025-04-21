import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await user.validatePassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login timestamp
    await this.usersService.update(user.id, {
      lastLogin: new Date(),
    });

    return this.generateToken(user);
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    
    // Exclude password from response
    const { password, ...result } = user;
    
    return {
      user: result,
      ...this.generateToken(result),
    };
  }

  generateToken(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}