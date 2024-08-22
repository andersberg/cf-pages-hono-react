## Development

```txt
bun install
bun run dev
```

## Deployment

```txt
bun run deploy
```

## Database

### Drizzle

```sh
# Generate a migraion file
bun run db:generate
```

### Cloudflare D1 Database

```sh
# Migrate Local D1 Database
bun run d1:local:migrate -- --file=./drizzle/<migration_filename>.sql

# Migrate Remote D1 Database
bun run d1:remote:migrate -- --file=./drizzle/<migration_filename>.sql

# Execute Local D1 Database
bun run d1:local:execute -- <args>

# Execute Remote D1 Database
bun run d1:remote:execute -- <args>
```
