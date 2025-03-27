# Provider decorators

## `@Inject` {#@Inject}

Decorator that injects service providers into controller classes or other service provider classes.

#### Signature

```typescript
constructor(
  @Inject(ServiceClass) private readonly service: ServiceClass
)
```

#### Parameters

| Parameter   | Type    | Required | Default | Description                       |
|-------------|---------|----------|---------|-----------------------------------|
| `ServiceClass`    | `class` | Yes      | -       | The class of the service provider |



