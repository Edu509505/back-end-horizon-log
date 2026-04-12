import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entity/inventory.entity';
import { UserDTO } from '../dto/dto.userDTO';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(user: UserDTO): Promise<UserDTO> {
    const createUsers = await this.userRepository.save(user);

    return createUsers;
  }

  async findAllUsers(): Promise<Users[]> {
    const users = await this.userRepository.find();

    return users;
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
