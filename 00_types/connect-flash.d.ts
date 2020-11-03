declare namespace Express {
  export interface Request {
      flash(): { [key: string]: string[] };
      flash(message: string): any;
      flash(event: string, message: string): any;
  }
}

declare module "connect-flash" {
  import express = require('express');
  interface IConnectFlashOptions {
      unsafe?: boolean;
  }
  function e(options?: IConnectFlashOptions): express.RequestHandler;
  export = e;
}