import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DaprService } from "./dapr.service";

@Module({
  imports: [ ConfigModule ],
  controllers: [ ],
  providers: [ DaprService ],
  exports: [ DaprService ]
})
export class DaprModule {}