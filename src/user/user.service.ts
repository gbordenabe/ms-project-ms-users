import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { USER } from 'src/common/models';
import { microserviceResponses } from 'src/common/utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      await createdUser.save();
      const { password, ...result } = createdUser.toJSON();
      return microserviceResponses.success(result);
    } catch (error) {
      return microserviceResponses.error(error);
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkUsernameEmailDisponibility(username: string, email: string) {
    try {
      const user = await this.userModel
        .findOne({
          $or: [{ username }, { email }],
        })
        .select('-password')
        .select('-_id')
        .select('-firstName')
        .select('-lastName')
        .select('-__v')
        .exec();

      if (user) {
        if (user.username === username) {
          throw new BadRequestException('Username already exists');
        }
        if (user.email === email) {
          throw new BadRequestException('Email already exists');
        }
      } else {
        return microserviceResponses.success(true);
      }
    } catch (error) {
      return microserviceResponses.error(error);
    }
  }
}
