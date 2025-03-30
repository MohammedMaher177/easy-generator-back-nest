import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { Callback, Context, Handler as LambdaHandler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: LambdaHandler;

async function bootstrap(): Promise<LambdaHandler> {
  const expressApp = express();
  const app = await NestFactory.create(AppModule);
  app.use(expressApp);
  await app.init();
  return serverlessExpress({ app: expressApp });
}
export const handler: LambdaHandler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
