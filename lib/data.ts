// Rates are ESTIMATES for the landing page.
// Replace with the company's real rate card before launch.

export type VehicleId = "suburban";
export type Vehicle = {
  id: VehicleId;
  name: string;
  passengers: number;
  image: string;
  alt: string;
  note: string;
};

export const fleet: Vehicle[] = [
  {
    id: "suburban",
    name: "2026 Chevrolet Suburban",
    passengers: 6,
    image: "/images/fleet-suburban.jpg",
    alt: "Black Chevrolet Suburban",
    note: "Big on space, comfort, and style. The Chevrolet Suburban makes every journey feel special."
  },
];

export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});