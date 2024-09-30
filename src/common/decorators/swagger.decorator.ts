import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiResponseOptions,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiProperty,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface UserSwaggerParams {
  operation: Partial<OperationObject>;
  auth?: boolean;
  response: ApiResponseOptions;
  possibleCodes?: HttpStatus[];
  onlyForAdmin?: boolean;
}

class ErrorSchema {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error?: string;
}

const possibleErrors = {
  [HttpStatus.BAD_REQUEST]: ApiBadRequestResponse({
    type: ErrorSchema,
    description: 'Cannot process the request due client error.',
  }),
  [HttpStatus.UNAUTHORIZED]: ApiUnauthorizedResponse({
    type: ErrorSchema,
    description: 'Need to authorize.',
  }),
  [HttpStatus.FORBIDDEN]: ApiForbiddenResponse({
    type: ErrorSchema,
    description:
      'The request contained valid data and was understood by the server, but the server is refusing action.',
  }),
  [HttpStatus.NOT_FOUND]: ApiNotFoundResponse({
    type: ErrorSchema,
    description: 'The requested resource could not be found but.',
  }),
};

export const UseSwagger = ({
  operation,
  response,
  auth = false,
  possibleCodes = [],
}: UserSwaggerParams): any => {
  const summary = operation.summary;

  const swaggerDocs = [
    ApiOperation({ ...operation, summary: summary }),
    ApiResponse(response),
  ];

  if (auth) {
    swaggerDocs.push(
      ApiBearerAuth(),
      possibleErrors[HttpStatus.UNAUTHORIZED],
      possibleErrors[HttpStatus.FORBIDDEN],
    );
  }

  possibleCodes.forEach((code) => {
    if (
      auth &&
      (code === HttpStatus.UNAUTHORIZED || code === HttpStatus.FORBIDDEN)
    )
      return;

    swaggerDocs.push(possibleErrors[code]);
  });

  return applyDecorators(...swaggerDocs);
};
