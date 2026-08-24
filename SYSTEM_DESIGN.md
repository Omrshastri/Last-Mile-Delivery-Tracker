# System Design

## Pricing and zones
The pricing API resolves both pincodes through `AreaZoneMapping`, establishes whether the shipment is intra-zone, and finds the unique rate card for its order type and route class. Volumetric weight is dimensions in centimetres multiplied and divided by 5,000. The higher of volumetric and actual mass is billable. The engine returns each calculation term so clients can show an explainable quote. Creation repeats the calculation server-side, making browser totals non-authoritative.

## Dispatch and lifecycle
Auto-dispatch selects an available agent currently in the pickup zone. This deterministic same-zone policy is intentionally simple and can later gain distance, capacity, and SLA scores. Agent changes are state-machine constrained; administrators can override when operations require it. Each transition inserts `TrackingHistory` in the same write as the order change and notifications are simulated through a central dispatcher.

Failed deliveries retain the reason and may be rescheduled only by their customer. Rescheduling clears assignment and becomes a distinct immutable timeline event, so dispatch can allocate an available agent again. SQLite suits local development; PostgreSQL should be used on Vercel with indexes already defined for operational filtering. Stateless Next.js handlers, relational constraints, a unique tracking number, and audit history make the design horizontally deployable and operationally reviewable.
