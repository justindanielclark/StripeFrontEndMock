import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";

type TFastifyRouteFunction<TRouteParams extends RouteGenericInterface> = (
  request: FastifyRequest<TRouteParams>,
  reply: FastifyReply
) => Promise<void>;

export type { TFastifyRouteFunction };
