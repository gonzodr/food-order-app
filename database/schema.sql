CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS foods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  food_id INTEGER REFERENCES foods(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

INSERT INTO foods (name, description, price, category, image_url) VALUES
  ('Szalámis Csípős Pizza', 'Paradicsomos alap, sajt, bazsalikom, chilli, szalámi', 2490, 'pizza', 'https://foodish-api.com/images/pizza/pizza32.jpg'),
  ('Magyaros Pizza', 'Paradicsomos alap, sajt, bazsalikom, pokolszalámi', 2490, 'pizza', 'https://foodish-api.com/images/pizza/pizza30.jpg'),
  ('Vega Pizza', 'Paradicsomos alap, vegán sajt, zöldség mix: répa, gomba, cukkini', 2700, 'pizza', 'https://foodish-api.com/images/pizza/pizza10.jpg'),
  ('Pizza Mediterran', 'Paradicsomos alap, sonka, gomba, sajt, oliva', 2750, 'pizza', 'https://foodish-api.com/images/pizza/pizza16.jpg'),
  ('Pizza Húsimádó', 'Paradicsomos alap, sonka, gomba, sajt, tarja, rukkola', 2750, 'pizza', 'https://foodish-api.com/images/pizza/pizza20.jpg'),
  ('Monterrey Burger', 'Marhahúspogácsa, Monterey Jack sajt, grillezett kukoricás salsa, chipotle paradicsomszósz, koriander-lime majonéz', 3700, 'burger', 'https://foodish-api.com/images/burger/burger48.jpg'),
  ('Amerikai Sajtburger', 'Marhahúspogácsa, fehér cheddar, ementáli sajt, kapros savanyú uborka, római saláta', 3700, 'burger', 'https://foodish-api.com/images/burger/burger5.jpg'),
  ('Big Kahuna Burger', 'Marhahúspogácsa, cheddar sajt, grill bacon, grillezett ananász, teriyaki szósz', 3800, 'burger', 'https://foodish-api.com/images/burger/burger25.jpg'),
  ('VEGA Burger', 'Beyond Meat pogácsa, gluténmentes zsömle, növényi cheddar sajt, római saláta, paradicsom, lilahagyma', 4500, 'burger', 'https://foodish-api.com/images/burger/burger76.jpg'),
  ('Málnás Palacsinta', 'Amerikai palacsinta málnával és málnalekvárral', 2100, 'desszert', 'https://foodish-api.com/images/dessert/dessert32.jpg'),
  ('Füge Bruscetta', 'Édes Bruscetta vanilia pudingal és fügével', 2800, 'desszert', 'https://foodish-api.com/images/dessert/dessert23.jpg'),
  ('Gyümölcsös Gőzgombóc', 'Gőzgombóc gránátalmával és eperrel töltve', 2600, 'desszert', 'https://foodish-api.com/images/dessert/dessert21.jpg'),
  ('Torta', 'Narancsos pisztácia torta', 600, 'desszert', 'https://foodish-api.com/images/dessert/dessert7.jpg'),
  ('Bolognai Spagetti', 'Igazi olaszos spagetti gazdagon hússal és paradicsommal', 3800, 'tészta', 'https://foodish-api.com/images/pasta/pasta23.jpg'),
  ('Carbonara Spagetti', 'Igazi olaszos spagetti gazdagon sajttal', 3800, 'tészta', 'https://foodish-api.com/images/pasta/pasta27.jpg');