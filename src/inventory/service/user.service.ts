import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entity/user.entity';
import { UserDTO } from '../dto/userDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(user: UserDTO): Promise<UserDTO> {
    return await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findUserId(id: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
    }
    return user;
  }

  async updateUser(id: string, data: Partial<Users>) {
    const updateUser = await this.userRepository.findOneBy({ id });
    if (!updateUser) throw new Error('Usuário Não Encontrado');

    Object.assign(updateUser, data);

    return await this.userRepository.save(updateUser);
  }

  async deleteUser(id: string): Promise<void> {
    const deleteUser = await this.userRepository.findOneBy({ id });
    if (!deleteUser) throw new NotFoundException('Usuário não encontrado');
    await this.userRepository.delete(id);
  }
}
