import { IsString, IsNotEmpty, IsPositive } from "class-validator";

export class UserDto {
  readonly id?: number;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
