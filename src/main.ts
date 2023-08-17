import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { readFileSync } from "fs";
import { join } from "path";
import { AppModule } from "./app.module";

const httpsOptions = {
  key: readFileSync(join("certs", "pkey.key")),
  cert: readFileSync(join("certs", "cert.csr")),
};

async function bootstrap() {
  const http_app = await NestFactory.create(AppModule,{ cors: true });
  await http_app.listen(3000);
  const https_app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  await https_app.listen(443);
}
bootstrap();




// const server = express();

// async function bootstrap() {
// const app = await NestFactory.create(
//   AppModule,
//   new ExpressAdapter(server),
// );
// await app.init();

// const httpServer = http.createServer(server).listen(3000);
// const httpsServer = https.createServer(httpsOptions, server).listen(443);


// }
// bootstrap();