import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../Users/services/user.service";
import { jwtContanst } from "../contants/jwt";
import { getRepository, Repository } from "typeorm";
// import { User } from "src/Users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
    // @InjectRepository(User)
    // private readonly userRepo: Repository<User>,

  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        `These credentials do not match our records.`
      );
    }

    if (await user.validatePassword(password)) {
      return user;
    }

    return null;
  }

  async login(email,password) {
    const payload = { email: email, password: password };
     const getValidate=await this.validateUser(email,password)
    return {
      validate:getValidate,
      accessToken: this.jwtService.sign(payload),
      expiresIn: jwtContanst.expiresIn
    };
  }

  async register(dataGet) {
    const created = this.userService.create({
      ...dataGet
    });
    return {
      status:201,
      data:created,
      accessToken: this.jwtService.sign(dataGet),
      expiresIn: jwtContanst.expiresIn
    };
  }
}