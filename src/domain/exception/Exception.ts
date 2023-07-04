export interface Exception_message_format {
  message: string;
  code_error: number;
}

export interface Exception {
  badRequestException(data: Exception_message_format): void;
  internalServerErrorException(data?: Exception_message_format): void;
  forbiddenException(data?: Exception_message_format): void;
  UnauthorizedException(data?: Exception_message_format): void;
}
