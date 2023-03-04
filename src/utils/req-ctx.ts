import { Request } from 'express';

export class RequestContext {
  static currentRequest: Request;
}