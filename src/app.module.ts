import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import Product_module from "./adapters/graphql/product/product.module";
import Order_module from "./adapters/graphql/order/order.module";
import Customer_module from "./adapters/graphql/customer/customer.module";
import { Auth_module } from "./adapters/graphql/auth/auth.module";
import { EmailSenderModule } from "./adapters/services/email_sender/email_sender.module";
import { File_module } from "./adapters/controllers/file/file.module";
import File_upload_module from "./adapters/controllers/file_upload/file_upload.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SeedersModule } from "./adapters/seeders/seeders.module";
import { CommandModule } from "nestjs-command";
import { ConfigModule } from "@nestjs/config";

const database_ulr = "mongodb://127.0.0.1:27017/shopping_api";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(database_ulr),
    CommandModule,
    SeedersModule,
    File_module,
    File_upload_module,
    Auth_module,
    Product_module,
    Order_module,
    Customer_module,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: "upper",
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    EmailSenderModule,
  ],
})
export class AppModule {}
