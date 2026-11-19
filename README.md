# Black Lane Services: landing page

Next.js 16 + Tailwind CSS 4 + Motion. Design language: Bugatti (see `DESIGN.md`).

## Run it
    npm install
    npm run dev          # http://localhost:3000 while editing
    npm run build        # static site in /out
    npm start            # serve /out on http://localhost:3000

## Before going live, replace the placeholders
- `lib/site.ts`: phone, email, address (all fake)
- `app/layout.tsx`: `metadataBase` domain
- `lib/data.ts`: hourly rates and minimums (estimates)
- `components/Faq.tsx` and `components/Chauffeur.tsx`: policies and claims (TLC licensing, cancellation, minimums, drinks)
- `components/Reserve.tsx`: `sendRequest()` opens the visitor's email app; connect it to a booking backend or form service
- Check that the name "Black Lane Services" is free to use in New York

## Photos
Free Unsplash / Pexels images, credited in `PHOTO-CREDITS.md`. Originals are in `_photos-raw/`.
Edits made: license plates, permit numbers and company lettering removed from the limos; crops and darkening for the night look.
The SUV limo (stretch Hummer) is the weakest photo: free black stretch-SUV photos barely exist. Your own fleet photos would be the biggest upgrade.
