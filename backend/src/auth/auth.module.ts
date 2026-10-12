import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./constants";
import { AuditModule } from "../audit/audit.module";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: "15m",
        ...(jwtConstants.issuer ? { issuer: jwtConstants.issuer } : {}),
        ...(jwtConstants.audience ? { audience: jwtConstants.audience } : {})
      }
    }),
    AuditModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
