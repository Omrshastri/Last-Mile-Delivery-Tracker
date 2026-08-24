# Last-Mile Delivery Tracker

Next.js 14 App Router delivery operations system with credential RBAC, Prisma, dynamic zone pricing, audit tracking, and agent dispatch.

## Run

1. Copy `.env.example` to `.env` and set `NEXTAUTH_SECRET`.
2. `npm install`
3. `npm run db:push && npm run db:seed`
4. `npm run dev`

For PostgreSQL, change the Prisma datasource provider to `postgresql` and set a PostgreSQL `DATABASE_URL`; the relational schema is compatible.

## Demo users

All use `Admin@123`: `admin@lmd.test`, `agent@lmd.test`, `customer@lmd.test`.

## API

- `POST /api/pricing/calculate` previews zone resolution and charge items.
- `GET|POST /api/orders` lists scoped orders or creates a customer/admin order.
- `POST /api/orders/:id/assign`, `/status`, and `/reschedule` perform controlled lifecycle work.
- `GET /api/tracking/:trackingNumber` is public.
- `GET|POST|PUT /api/admin/zones` and `GET|POST /api/admin/rate-cards` require admin.

Pricing uses volumetric kg = `(L × B × H) / 5000`; billable kg is max(actual, volumetric). Charge is base rate plus excess kg × per-kg rate, plus COD fee for COD shipments. Rate cards are database data, never hardcoded.
