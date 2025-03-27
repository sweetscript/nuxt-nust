# Controller decorators

## `@Controller` {#@Controller}

Decorator to declare a class as a controller class

#### Signature

```typescript
@Controller(prefix?: string, options?: ControllerOptions)
```

#### Parameters

| Parameter   | Type          | Required | Default | Description                                             |
|-------------|---------------|----------|---------|---------------------------------------------------------|
| `prefix`    | `string`      | No       | -       | A prefix to add to all controller method routes         |
| `options`   | `Object`      | No       | `{}`    | Configuration:                                          |
| ↳`guards`   | `NustGuard[]` | No       | -      | A list of guards to add to all controller method routes |

---

## Route Decorators {#RouteDecorators}

## `@Get` {#@Get}

Decorator to declare a GET method route server handler

#### Signature

```typescript
@Get(path: string)
```

#### Parameters

| Parameter | Type          | Required | Default | Description           |
|-----------|---------------|----------|---------|-----------------------|
| `path`     | `string`      | Yes      | -       | The path of the route |

---

## `@Post` {#@Post}

Decorator to declare a POST method route server handler

#### Signature

```typescript
@Post(path: string)
```

#### Parameters

| Parameter | Type          | Required | Default | Description           |
|-----------|---------------|----------|---------|-----------------------|
| `path`     | `string`      | Yes      | -       | The path of the route |

---

## `@Put` {#@Put}

Decorator to declare a PUT method route server handler

#### Signature

```typescript
@Put(path: string)
```

#### Parameters

| Parameter | Type          | Required | Default | Description           |
|-----------|---------------|----------|---------|-----------------------|
| `path`     | `string`      | Yes      | -       | The path of the route |

---

## `@Patch` {#@Patch}

Decorator to declare a PATCH method route server handler

#### Signature

```typescript
@Patch(path: string)
```

#### Parameters

| Parameter | Type          | Required | Default | Description           |
|-----------|---------------|----------|---------|-----------------------|
| `path`     | `string`      | Yes      | -       | The path of the route |

---

## `@Delete` {#@Delete}

Decorator to declare a DELETE method route server handler

#### Signature

```typescript
@Delete(path: string)
```

#### Parameters

| Parameter | Type          | Required | Default | Description           |
|-----------|---------------|----------|---------|-----------------------|
| `path`     | `string`      | Yes      | -       | The path of the route |

---

## `@Options` {#@Options}

Decorator to declare a OPTIONS method route server handler

#### Signature

```typescript
@Options(path: string)
```

#### Parameters

| Parameter | Type          | Required | Default | Description           |
|-----------|---------------|----------|---------|-----------------------|
| `path`     | `string`      | Yes      | -       | The path of the route |

---

## `@Head` {#@Head}

Decorator to declare a HEAD method route server handler

#### Signature

```typescript
@Head(path: string)
```

#### Parameters

| Parameter | Type          | Required | Default | Description           |
|-----------|---------------|----------|---------|-----------------------|
| `path`     | `string`      | Yes      | -       | The path of the route |

---

## `@Any` {#@Any}

Decorator to declare a method route server handler that will catch all request methods

#### Signature

```typescript
@Any(path: string)
```

#### Parameters

| Parameter | Type          | Required | Default | Description           |
|-----------|---------------|----------|---------|-----------------------|
| `path`     | `string`      | Yes      | -       | The path of the route |

---
