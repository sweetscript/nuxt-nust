# Open API decorators

## `@ApiSchema` {#@ApiSchema}

Decorator that can be used on DTOs to modify thier schema data

#### Signature

```typescript
@ApiSchema(schema: {
  title?: string,
  description?: string
  required?: string[]
})
```

#### Parameters

| Parameter   | Type               | Required | Default | Description                       |
|-------------|--------------------|----------|---------|-----------------------------------|
| `schema`    | `ApiSchemaOptions` | No       | -       | Open api schema options for model |

---

## `@ApiProperty` {#@ApiProperty}

Decorator that can be used on DTO parameters to state thier type and show them in the openapi model

#### Signature

```typescript
@ApiProperty(options: {
  title?: string,
  description?: string
  required?: boolean,
  type: OpenApi.SchemaObject['type'],
  default: OpenApi.SchemaObject['default'],
  allOf: OpenApi.SchemaObject['type'],
  anyOf: OpenApi.SchemaObject['type']
  enum: OpenApi.SchemaObject['type'],
  deprecated: OpenApi.SchemaObject['deprecated'],
  nullable: OpenApi.SchemaObject['nullable'],
  format: OpenApi.SchemaObject['format'],
  oneOf: OpenApi.SchemaObject['oneOf'],
  xml: OpenApi.SchemaObject['xml'],
  discriminator: OpenApi.SchemaObject['discriminator'],
})
```

#### Parameters

| Parameter | Type                 | Required | Default | Description                              |
|-----------|----------------------|----------|---------|------------------------------------------|
| `options` | `ApiPropertyOptions` | Yes      | -       | Open api schema options for DTO property |**

---

## `@ApiResponse` {#@ApiResponse}

Decorator that can be used on controller method to add response schemas to its openapi schema 

#### Signature

```typescript
@ApiResponse(options: {
  status?: number, 
  description?: string
  instance?: class
  content?: string
})
```

#### Parameters

| Parameter      | Type                      | Required | Default | Description                                                                            |
|----------------|---------------------------|----------|---------|----------------------------------------------------------------------------------------|
| `options`      | `ApiResponseOptions`      | Yes      | -       | Open api response schema options for method                                            |
| ↳`status`      | `number`                  | Yes      | -       | statue code of response                                                                |
| ↳`description` | `string`                  | No       | -       | A description to add to the openapi schema for the route                               |
| ↳`instance`    | `class`                   | No       | -       | Pass a DTO class here and the nust module will convert it to an openapi schema content |
| ↳`content`     | `SchemaObject['content']` | No       | -       | Can be used to define openapi schema content directly for response                     |

---

## ApiResponse Shorthands {#ApiResponseShorthands}

You can use shorthands to assign openapi responses to methods quickly

The shorthands will set the status code and description, however you can still pass `description`, `instance` and `content`.

### Success responses
#### 200 `@ApiOkResponse` {#@ApiOkResponse}
#### 201 `@ApiCreatedResponse` {#@ApiCreatedResponse}
#### 202 `@ApiAcceptedResponse` {#@ApiAcceptedResponse}
#### 204 `@ApiNoContentResponse` {#@ApiNoContentResponse}
### Redirect responses
#### 301 `@ApiMovedPermanentlyResponse` {#@ApiMovedPermanentlyResponse}
#### 302 `@ApiFoundResponse` {#@ApiFoundResponse}
### Error responses
#### 400 `@ApiBadRequestResponse` {#@ApiBadRequestResponse}
#### 401 `@ApiUnauthorizedResponse` {#@ApiUnauthorizedResponse}
#### 403 `@ApiForbiddenResponse` {#@ApiForbiddenResponse}
#### 404 `@ApiNotFoundResponse` {#@ApiNotFoundResponse}
#### 405 `@ApiMethodNotAllowedResponse` {#@ApiMethodNotAllowedResponse}
#### 406 `@ApiNotAcceptableResponse` {#@ApiNotAcceptableResponse}
#### 408 `@ApiRequestTimeoutResponse` {#@ApiRequestTimeoutResponse}
#### 409 `@ApiConflictResponse` {#@ApiConflictResponse}
