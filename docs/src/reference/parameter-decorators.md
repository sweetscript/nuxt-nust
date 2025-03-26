# Parameter decorators

### `@Param` {#@Param}

Decorator that return the request path parameter value

#### Signature

```typescript
@Param(name: string) param: string
```

#### Parameters

| Parameter   | Type          | Required | Default | Description                                       |
|-------------|---------------|----------|---------|---------------------------------------------------|
| `parameter`    | `string`      | Yes      | -       | The parameter name as specified in the route path |

---

### `@Body` {#@Body}

Decorator that return the payload after it has been transformed tot he passed class type, and validated if `class-validator` decorators were added to it.

#### Signature

```typescript
@Body(dtoClass: ClassType) dto: ClassType
```

#### Parameters

| Parameter  | Type    | Required | Default | Description   |
|------------|---------|----------|---------|---------------|
| `dtoClass` | `class` | Yes      | -       | The dto class |

---

### `@RawBody` {#@RawBody}

Decorator that return the request path parameter value

#### Signature

```typescript
@RawBody() body: object
```

---

### `@Query` {#@Query}

Decorator that return the query parameter

#### Signature

```typescript
@Query(name: string) param: string
```

#### Parameters

| Parameter  | Type     | Required | Default | Description                     |
|------------|----------|----------|---------|---------------------------------|
| `name` | `string` | Yes      | -       | The name of the query parameter |

---

### `@Ip` {#@Ip}

Decorator that return the IP address from the request source

#### Signature

```typescript
@Ip() ip: string
```

---


### `createCustomParamDecorator` {#@createCustomParamDecorator}

A utility function that allows you to create your own paramter decorators

#### Signature

```typescript
createCustomParamDecorator((event: H3Event) => any | Promise<any>)
```

---


