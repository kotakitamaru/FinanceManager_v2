import { BaseService } from '@/services/BaseService';
import { UserRepository } from '@/repositories/UserRepository';
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '@/types/UserTypes';
import bcrypt from 'bcrypt';

export class UserService extends BaseService {
  private userRepository: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async getUsers(page: number = 1, limit: number = 10, search?: string): Promise<{
    users: UserResponse[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this.userRepository.findAll(page, limit, search);
    return {
      ...result,
      page,
      limit
    };
  }

  async getUserById(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(userData: CreateUserRequest): Promise<UserResponse> {
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

    return await this.userRepository.create(userToCreate);
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<UserResponse> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Check if email is being changed and if it's already taken
    if (userData.email && userData.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(userData.email);
      if (userWithEmail) {
        throw new Error('User with this email already exists');
      }
    }

    // Hash password if provided
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }
}
