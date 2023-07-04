import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import Product_module from './adapters/graphql/product/product.module';
import Order_module from './adapters/graphql/order/order.module';
import Customer_module from './adapters/graphql/customer/customer.module';
import { Auth_module } from './adapters/graphql/auth/auth.module';

@Module({
  imports: [
    Auth_module,
    Product_module,
    Order_module,
    Customer_module,
    Customer_module,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
})
export class AppModule {}
