import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import Product_module from "./adapters/graphql/product/product.module";
import Order_module from "./adapters/graphql/order/order.module";
import Customer_module from "./adapters/graphql/customer/customer.module";
import { Auth_module } from "./adapters/graphql/auth/auth.module";
import { EmailSenderModule } from "./adapters/services/email_sender/email_sender.module";
import Product_file_upload_module from './adapters/controllers/product_file_upload/product_file_upload.module';
import File_upload_module from "./adapters/controllers/customer_file_upload/product_file_upload.module";

@Module({
  imports: [
    File_upload_module,
    Product_file_upload_module,
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
