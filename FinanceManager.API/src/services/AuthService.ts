import { BaseService } from '@/services/BaseService';
import { UserRepository } from '@/repositories/UserRepository';
import { CreateUserRequest, UserLoginRequest, UserLoginResponse } from '@/types/UserTypes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService extends BaseService {
  private userRepository: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async register(userData: CreateUserRequest): Promise<UserLoginResponse> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user with hashed password
    const userToCreate = {
      ...userData,
      password: hashedPassword
    };

    const user = await this.userRepository.create(userToCreate);

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    };
  }

  async login(loginData: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    };
  }

  async verifyToken(token: string): Promise<{ id: number; email: string; name: string }> {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret is not configured');
    }

    try {
      const decoded = jwt.verify(token, secret) as any;
      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name
      };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  private generateToken(user: { id: number; email: string; name: string }): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret is not configured');
    }

    return jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        name: user.name
      },
      secret,
      { expiresIn: '24h' }
    );
  }
}
