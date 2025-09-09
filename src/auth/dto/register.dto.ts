import { LoginDto } from "./login.dto";
import { PartialType } from "@nestjs/mapped-types";

export class RegisterDto  extends PartialType(LoginDto){}