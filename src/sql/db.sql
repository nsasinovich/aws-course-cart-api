CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATION --
CREATE TABLE IF NOT EXISTS carts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
    product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id uuid NOT NULL,
    count INTEGER NOT NULL,
    FOREIGN KEY ("cart_id") REFERENCES carts ("id")
);

-- SEEDING --
INSERT INTO carts (id, user_id, created_at, updated_at) VALUES
('ff15d60a-f651-493d-9739-5ea390677ddc', '191ed943-d596-48ca-aabc-febd40184bba', '2022-11-11', '2022-11-12'),
('94f5936f-477f-44f1-b7bb-d05e67ae71da', '9884c1aa-ef47-424d-bef0-a0467597986d', '2022-12-01', '2022-12-01');

INSERT INTO cart_items (product_id, cart_id, count) VALUES
('8ad63697-9c0c-4ab9-9136-9dcf4a0ccf3f', 'ff15d60a-f651-493d-9739-5ea390677ddc', 3),
('a124d918-7a73-4bbf-8edb-070aaf23ba71', 'ff15d60a-f651-493d-9739-5ea390677ddc', 1);

-- DROP TABLES --
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts CASCADE

