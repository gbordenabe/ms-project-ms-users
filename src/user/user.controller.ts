import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.userService.findOne(+id);
  }

  @MessagePattern(UserMSG.FIND_ONE_BY_USERNAME)
  findOneByUsername(@Payload() username: string) {
    return this.userService.findOneByUsername(username);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: { id: string; updateUserDto: UpdateUserDto }) {
    return this.userService.update(+payload.id, payload.updateUserDto);
  }

  @MessagePattern(UserMSG.DELETE)
  remove(@Payload() id: string) {
    return this.userService.remove(+id);
  }

  @MessagePattern(UserMSG.CHECK_USERNAME_EMAIL_DISPONIBILITY)
  checkUser(@Payload() payload: { username: string; email: string }) {
    return this.userService.checkUsernameEmailDisponibility(
      payload.username,
      payload.email,
    );
  }
}
