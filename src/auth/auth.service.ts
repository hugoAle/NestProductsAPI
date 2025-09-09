import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/auth.utils';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
     private jwtService: JwtService
  ) {}
  
  async register(registerDto: RegisterDto) {
   
    const hashedPassword = await hashPassword(registerDto.password || '');
    
    const newItem = await this.usersRepository.save({
      ...registerDto,
      password: hashedPassword
    });

    return {
      success: true,
      data: {
        username: newItem.email
      }
    };
  }

  async login(loginDto: LoginDto) {
   
    const oneItem = await this.usersRepository.findOne({
      where: {
       email: loginDto.email
      },
    });

    if(!oneItem)
      throw new UnauthorizedException({
       success: false,
       message: 'User not exist'
      });
    
    //check password
    const passworkOK = await bcrypt.compare(loginDto.password, oneItem.password);

    if (!passworkOK) {
      throw new UnauthorizedException({
       success: false,
       message: 'Wrong password'
      });
    }

    const payload = {
      sub: oneItem.id,
      username: oneItem.email
    };

    const accessToken = await this.jwtService.signAsync(payload,{
      expiresIn: '24h',
      audience: 'products-api',
      issuer: 'products-api'
    })

    return {
      success: true,
      data: {
        access_token: accessToken
      }
    };

  }
}
