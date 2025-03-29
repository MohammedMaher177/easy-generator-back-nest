import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserDocument } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }


    @Get('describe-me')
    async describeMe(@GetUser() user: UserDocument) {
        return await this.service.findById(String(user._id));
    }

}
