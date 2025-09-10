import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockLoginDto, mockRegisterDto } from '../../test/mocks/auth.mock.dto';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('../utils/auth');
jest.mock('bcrypt');

let usersRepositoryMock =  {
  save: jest.fn().mockReturnValue({
    id: 1,
    email: mockRegisterDto.email,
    password: '***'
  }),
  findOne: jest.fn()
}


describe('AuthService', () => {
  
  let service: AuthService;
  let jwtServiceMock: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // JwtModule.register({
        //   global: true,
        //   secret: ''
        // }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn()
          },
        },
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtServiceMock = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully register a user', async () => {
    const mockResponse = await service.register(mockRegisterDto);
    expect(mockResponse.success).toBe(true);
    expect(usersRepositoryMock.save).toHaveBeenCalled();
    expect(mockResponse.data.username).toEqual(mockRegisterDto.email);
  });


  it('should throw exception if username not found ', async () => {
    
    (usersRepositoryMock.findOne as jest.Mock).mockResolvedValue(false);

    const expectedError = {
      success: false,
      message: 'User not exist'
    }

    await expect(
     service.login(mockLoginDto),
    ).rejects.toThrow(new UnauthorizedException(expectedError));

    expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();

  });

  it('should throw exception if password is incorrect', async () => {
    
    (usersRepositoryMock.findOne as jest.Mock).mockResolvedValue(true);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const expectedError = {
      success: false,
      message: 'Wrong password'
    }

    await expect(
     service.login(mockLoginDto),
    ).rejects.toThrow(new UnauthorizedException(expectedError));

    expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();

  });

  it('should return an access_token on successful login', async () => {
    
    (usersRepositoryMock.findOne as jest.Mock).mockResolvedValue(true);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwtServiceMock.signAsync as jest.Mock).mockResolvedValue('dummy_1234');

    const mockResponse = await service.login(mockLoginDto);
    expect(mockResponse.success).toBe(true);
    expect(mockResponse.data).toHaveProperty('access_token');
    expect(mockResponse.data.access_token).not.toBe('');

  });


});
