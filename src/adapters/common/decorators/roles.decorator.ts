import { SetMetadata } from "@nestjs/common";
import { roles } from "src/domain/services/jwt.interface";

/**
 * decorator for set custom role metadata for associated
 * execution context for nest role guard
 * @param roles
 */


export const Roles = (...roles: roles[]) => SetMetadata("roles", roles);
