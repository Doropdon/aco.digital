# Aco.Digital

Premium digital product and subscription storefront.

## Stack
- React 19 + TypeScript + Vite
- Supabase Postgres/Auth with Row Level Security
- Netlify continuous deployment

## Development
1. Copy `.env.example` to `.env`.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (publishable key only; never put a service-role/secret key in browser variables).
3. Run `npm install`.
4. Run `npm run dev`.
5. Run `npm run build` before submitting changes.

## Deployment policy
- `main` is the production branch.
- Feature branches create preview deployments.
- Do not merge to `main` or publish production without explicit owner approval.
- Initial public production launch is reserved for the one approved launch deployment.

## Current implementation status
The current storefront and checkout are preview-only. The checkout intentionally does not create orders or collect payments until secure server-side order, payment verification, OTP, wallet-ledger, and admin workflows have been implemented and tested. Product cards currently contain sample catalogue data; replace with verified admin-managed catalogue data before launch.

## Security notes
- Supabase public-schema tables have RLS enabled.
- Public read access is limited to active categories, published products/packages, and currently active banners.
- Customer order, wallet, and active-product reads are owner-scoped.
- Admin authorization uses trusted `app_metadata.role` claims, never user-editable metadata.
- Service-role/secret keys must remain server-side.
