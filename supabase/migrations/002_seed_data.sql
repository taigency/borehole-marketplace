-- BoreHub Seed Data
-- Run this after the schema migration

-- Insert demo users
INSERT INTO users (id, email, phone, name, role, company, province, city, verified) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'johan@aquadrill.co.za', '+27 82 111 2222', 'Johan van der Berg', 'supplier', 'AquaDrill SA', 'Gauteng', 'Johannesburg', true),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'sarah@hydrotech.co.za', '+27 83 222 3333', 'Sarah Mitchell', 'supplier', 'HydroTech Solutions', 'Western Cape', 'Cape Town', true),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'thabo@geofind.co.za', '+27 84 333 4444', 'Thabo Mokoena', 'service_provider', 'GeoFind Consulting', 'KwaZulu-Natal', 'Durban', true),
('d4e5f6a7-b8c9-0123-defa-234567890123', 'david@wellfix.co.za', '+27 85 444 5555', 'David Nkosi', 'service_provider', 'WellFix Pro', 'Limpopo', 'Polokwane', true),
('e5f6a7b8-c9d0-1234-efab-345678901234', 'anna@boreparts.co.za', '+27 86 555 6666', 'Anna van der Merwe', 'supplier', 'BoreParts Co', 'Gauteng', 'Pretoria', true),
('f6a7b8c9-d0e1-2345-fabc-456789012345', 'peter@tankdepot.co.za', '+27 87 666 7777', 'Peter Botha', 'supplier', 'TankDepot SA', 'Western Cape', 'Stellenbosch', true),
('a7b8c9d0-e1f2-3456-abcd-567890123456', 'maria@electrodrill.co.za', '+27 88 777 8888', 'Maria Pretorius', 'supplier', 'ElectroDrill', 'Mpumalanga', 'Nelspruit', true),
('b8c9d0e1-f2a3-4567-bcde-678901234567', 'customer1@example.com', '+27 89 888 9999', 'James Fisher', 'customer', NULL, 'Gauteng', 'Sandton', true),
('c9d0e1f2-a3b4-5678-cdef-789012345678', 'customer2@example.com', '+27 80 999 0000', 'Linda Naidoo', 'customer', NULL, 'KwaZulu-Natal', 'Pietermaritzburg', true),
('d0e1f2a3-b4c5-6789-defa-890123456789', 'info@waterworks.co.za', '+27 81 000 1111', 'Willem Joubert', 'supplier', 'WaterWorks Pro', 'Free State', 'Bloemfontein', true);

-- Insert suppliers
INSERT INTO suppliers (id, user_id, company_name, description, categories, rating, review_count, verified, subscription_tier, contact_email, contact_phone) VALUES
('11111111-1111-1111-1111-111111111111', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'AquaDrill SA', 'Leading supplier of submersible pumps, controllers, and complete water systems.', ARRAY['pumps', 'controllers'], 4.8, 156, true, 'premium', 'johan@aquadrill.co.za', '+27 82 111 2222'),
('22222222-2222-2222-2222-222222222222', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'HydroTech Solutions', 'Complete range of borehole casings, screens, and drilling accessories.', ARRAY['casings', 'bits', 'accessories'], 4.6, 98, true, 'premium', 'sarah@hydrotech.co.za', '+27 83 222 3333'),
('33333333-3333-3333-3333-333333333333', 'e5f6a7b8-c9d0-1234-efab-345678901234', 'BoreParts Co', 'Specialist supplier of borehole components, fittings, and spare parts.', ARRAY['pipes', 'filters', 'accessories'], 4.5, 87, true, 'basic', 'anna@boreparts.co.za', '+27 86 555 6666'),
('44444444-4444-4444-4444-444444444444', 'f6a7b8c9-d0e1-2345-fabc-456789012345', 'TankDepot SA', 'Premium water storage solutions including JoJo tanks and reservoirs.', ARRAY['tanks', 'filters'], 4.7, 112, true, 'premium', 'peter@tankdepot.co.za', '+27 87 666 7777'),
('55555555-5555-5555-5555-555555555555', 'a7b8c9d0-e1f2-3456-abcd-567890123456', 'ElectroDrill', 'Professional drilling equipment, electrical components, and motor solutions.', ARRAY['pumps', 'controllers', 'accessories'], 4.4, 65, true, 'basic', 'maria@electrodrill.co.za', '+27 88 777 8888'),
('66666666-6666-6666-6666-666666666666', 'd0e1f2a3-b4c5-6789-defa-890123456789', 'WaterWorks Pro', 'Full-service water solutions provider. Pumps, tanks, filtration, and installation.', ARRAY['pumps', 'tanks', 'filters', 'controllers'], 4.6, 78, true, 'premium', 'info@waterworks.co.za', '+27 81 000 1111');

-- Insert services
INSERT INTO services (id, provider_id, title, description, category, price_type, price_min, price_max, coverage_areas, available, rating, review_count) VALUES
('aaaa1111-1111-1111-1111-111111111111', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'Premium Borehole Drilling', 'Professional borehole drilling for residential, commercial, and agricultural needs.', 'drilling', 'per_meter', 180, 600, ARRAY['Gauteng', 'North West', 'Mpumalanga'], true, 4.9, 127),
('aaaa2222-2222-2222-2222-222222222222', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'Geophysics Survey & Siting', 'Comprehensive geophysical surveys to identify optimal borehole locations.', 'geophysics', 'fixed', 3200, 25000, ARRAY['Gauteng', 'KwaZulu-Natal', 'Free State'], true, 4.7, 64),
('aaaa3333-3333-3333-3333-333333333333', 'd4e5f6a7-b8c9-0123-defa-234567890123', 'Pump Installation & Repair', 'Expert installation, maintenance, and repair of all submersible and jet pump systems.', 'pump_installation', 'quote', 2500, 15000, ARRAY['Limpopo', 'Gauteng', 'Mpumalanga'], true, 4.8, 89),
('aaaa4444-4444-4444-4444-444444444444', 'd4e5f6a7-b8c9-0123-defa-234567890123', 'Borehole Rehabilitation', 'Complete borehole rehabilitation including cleaning, deepening, and yield improvement.', 'maintenance', 'quote', 2800, 20000, ARRAY['Limpopo', 'North West', 'Gauteng'], true, 4.9, 103),
('aaaa5555-5555-5555-5555-555555555555', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'Hydrogeological Consulting', 'Professional consulting on groundwater resources and water quality.', 'consulting', 'hourly', 500, 1500, ARRAY['Gauteng', 'Western Cape', 'KwaZulu-Natal'], true, 4.6, 42),
('aaaa6666-6666-6666-6666-666666666666', 'd4e5f6a7-b8c9-0123-defa-234567890123', 'Water Quality Testing', 'Comprehensive water quality analysis and testing for borehole water.', 'maintenance', 'fixed', 1500, 3000, ARRAY['Gauteng', 'Limpopo', 'Mpumalanga', 'North West'], true, 4.5, 38);

-- Insert products
INSERT INTO products (id, supplier_id, name, description, category, subcategory, price, stock, min_order_quantity, lead_time_days) VALUES
('bbbb1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Grundfos SP 5A-12 Submersible Pump', 'High-efficiency submersible pump. 0.75kW, 12 stage, stainless steel.', 'pumps', 'submersible', 12500, 24, 1, 3),
('bbbb2222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'DAB Submersible Pump 0.75kW', 'Reliable submersible pump for domestic and light commercial use.', 'pumps', 'submersible', 4299, 45, 1, 2),
('bbbb3333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', '160mm PVC Borehole Casing (6m)', 'Schedule 40 PVC casing for borehole construction. UV resistant.', 'casings', 'pvc', 1200, 120, 5, 5),
('bbbb4444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Diamond Drill Bit 150mm', 'Premium diamond drill bit for hard rock formations.', 'bits', 'diamond', 8500, 15, 1, 7),
('bbbb5555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'JoJo 2500L Water Tank', 'UV-stabilised polyethylene water storage tank. 5-year warranty.', 'tanks', 'storage', 4500, 35, 1, 3),
('bbbb6666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'Borehole Stainless Steel Screen', '304 stainless steel well screen. Slot size 0.5mm. 3m length.', 'filters', 'screen', 3200, 50, 1, 5),
('bbbb7777-7777-7777-7777-777777777777', '55555555-5555-5555-5555-555555555555', 'Franklin Electric Submersible Motor', '4-inch submersible motor. 1.5kW, 380V.', 'pumps', 'motor', 9800, 18, 1, 7),
('bbbb8888-8888-8888-8888-888888888888', '55555555-5555-5555-5555-555555555555', 'Pressure Controller 2.2kW', 'Automatic pressure switch controller for pump systems.', 'controllers', 'pressure', 2800, 60, 1, 2),
('bbbb9999-9999-9999-9999-999999999999', '33333333-3333-3333-3333-333333333333', 'HDPE Pipe 50mm x 100m Roll', 'High-density polyethylene pipe for water supply. PN16 rated.', 'pipes', 'hdpe', 5600, 25, 1, 4),
('bbbbaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Borehole Seal Kit', 'Complete borehole sealing kit including bentonite and grout.', 'accessories', 'seals', 1500, 80, 1, 2),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '66666666-6666-6666-6666-666666666666', 'Water Level Meter 100m', 'Professional water level meter with tape measure.', 'accessories', 'measurement', 6200, 10, 1, 5),
('bbbbcccc-cccc-cccc-cccc-cccccccccccc', '66666666-6666-6666-6666-666666666666', 'Solar Pump Controller', 'MPPT solar pump controller for off-grid borehole systems.', 'controllers', 'solar', 15000, 8, 1, 10);

-- Insert leads
INSERT INTO leads (id, source, customer_name, customer_email, customer_phone, service_type, location, province, budget, description, status, score) VALUES
('cccc1111-1111-1111-1111-111111111111', 'website', 'Pieter van Wyk', 'pieter@farm.co.za', '+27 72 111 2222', 'drilling', 'Gauteng', 'Gauteng', 75000, 'Need borehole drilled on game farm. ~120m depth.', 'new', 85),
('cccc2222-2222-2222-2222-222222222222', 'website', 'Michelle Adams', 'michelle@estate.co.za', '+27 73 222 3333', 'pump_installation', 'Cape Town', 'Western Cape', 15000, 'Existing borehole needs new pump installation.', 'qualified', 72),
('cccc3333-3333-3333-3333-333333333333', 'phone', 'Sipho Dlamini', 'sipho@municipality.gov.za', '+27 74 333 4444', 'geophysics', 'Mpumalanga', 'Mpumalanga', 50000, 'Municipal water project. Survey for 3 sites.', 'assigned', 90),
('cccc4444-4444-4444-4444-444444444444', 'referral', 'Johan Kruger', 'johan@lodge.co.za', '+27 75 444 5555', 'drilling', 'Limpopo', 'Limpopo', 120000, 'Safari lodge needs 2 new boreholes.', 'quoted', 95),
('cccc5555-5555-5555-5555-555555555555', 'website', 'Fatima Patel', 'fatima@farm.co.za', '+27 76 555 6666', 'maintenance', 'Free State', 'Free State', 8000, 'Borehole water cloudy. Needs inspection.', 'new', 65),
('cccc6666-6666-6666-6666-666666666666', 'marketing', 'Andre du Plessis', 'andre@school.co.za', '+27 77 666 7777', 'drilling', 'Gauteng', 'Gauteng', 45000, 'School needs borehole for irrigation.', 'qualified', 78);

-- Insert orders
INSERT INTO orders (id, order_number, customer_id, supplier_id, status, subtotal, commission, total, payment_status) VALUES
('dddd1111-1111-1111-1111-111111111111', 'ORD-2026-001', 'b8c9d0e1-f2a3-4567-bcde-678901234567', '11111111-1111-1111-1111-111111111111', 'delivered', 12500, 1250, 13750, 'paid'),
('dddd2222-2222-2222-2222-222222222222', 'ORD-2026-002', 'c9d0e1f2-a3b4-5678-cdef-789012345678', '44444444-4444-4444-4444-444444444444', 'shipped', 4500, 450, 4950, 'paid'),
('dddd3333-3333-3333-3333-333333333333', 'ORD-2026-003', 'b8c9d0e1-f2a3-4567-bcde-678901234567', '22222222-2222-2222-2222-222222222222', 'processing', 6000, 600, 6600, 'paid'),
('dddd4444-4444-4444-4444-444444444444', 'ORD-2026-004', 'c9d0e1f2-a3b4-5678-cdef-789012345678', '33333333-3333-3333-3333-333333333333', 'pending', 7100, 710, 7810, 'pending'),
('dddd5555-5555-5555-5555-555555555555', 'ORD-2026-005', 'b8c9d0e1-f2a3-4567-bcde-678901234567', '66666666-6666-6666-6666-666666666666', 'confirmed', 15000, 1500, 16500, 'paid');

-- Insert order items
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price) VALUES
('dddd1111-1111-1111-1111-111111111111', 'bbbb1111-1111-1111-1111-111111111111', 'Grundfos SP 5A-12 Submersible Pump', 1, 12500, 12500),
('dddd2222-2222-2222-2222-222222222222', 'bbbb5555-5555-5555-5555-555555555555', 'JoJo 2500L Water Tank', 1, 4500, 4500),
('dddd3333-3333-3333-3333-333333333333', 'bbbb3333-3333-3333-3333-333333333333', '160mm PVC Borehole Casing (6m)', 5, 1200, 6000),
('dddd4444-4444-4444-4444-444444444444', 'bbbb9999-9999-9999-9999-999999999999', 'HDPE Pipe 50mm x 100m Roll', 1, 5600, 5600),
('dddd4444-4444-4444-4444-444444444444', 'bbbbaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Borehole Seal Kit', 1, 1500, 1500),
('dddd5555-5555-5555-5555-555555555555', 'bbbbcccc-cccc-cccc-cccc-cccccccccccc', 'Solar Pump Controller', 1, 15000, 15000);

-- Insert quotes
INSERT INTO quotes (id, lead_id, provider_id, amount, description, valid_until, status) VALUES
('eeee1111-1111-1111-1111-111111111111', 'cccc1111-1111-1111-1111-111111111111', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 68000, 'Complete drilling package incl casing, dev, and yield test.', NOW() + INTERVAL '30 days', 'pending'),
('eeee2222-2222-2222-2222-222222222222', 'cccc4444-4444-4444-4444-444444444444', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 110000, 'Two boreholes to 150m each. Incl geophysics, drilling, casing, pump.', NOW() + INTERVAL '14 days', 'accepted'),
('eeee3333-3333-3333-3333-333333333333', 'cccc3333-3333-3333-3333-333333333333', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 42000, 'Geophysical survey for 3 sites incl reporting.', NOW() + INTERVAL '30 days', 'pending'),
('eeee4444-4444-4444-4444-444444444444', 'cccc2222-2222-2222-2222-222222222222', 'd4e5f6a7-b8c9-0123-defa-234567890123', 12500, 'Complete pump replacement incl new pump, controller, installation.', NOW() + INTERVAL '30 days', 'pending');
