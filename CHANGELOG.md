## 1.1.1 (Jan 22, 2021)
* print log when resolve file failed

## 1.1.0 (Sept 3, 2018)

### Features

* **disable:** allow disable mock

## 1.0.0 (Apr 27, 2018)
You can no longer pass "express" as argument to the middleware .We import it inside this middleware.

```
app.use(mockMiddleware(options: {path: '/mock'}))
```
