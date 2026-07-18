-- jalalbuilds D1 schema (SQLite)
-- Security model: only this Worker can access D1.
-- Public APIs must never SELECT from contact_messages / newsletter_subscribers.

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS contact_packages (
  id TEXT PRIMARY KEY NOT NULL,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS contact_packages_active_sort_idx
  ON contact_packages (is_active, sort_order);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  url TEXT,
  tags TEXT NOT NULL DEFAULT '[]', -- JSON array of strings
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS projects_featured_idx
  ON projects (featured DESC, sort_order ASC);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  url TEXT,
  tags TEXT NOT NULL DEFAULT '[]', -- JSON array of strings
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS blog_posts_featured_idx
  ON blog_posts (featured DESC, sort_order ASC);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  quote TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible INTEGER NOT NULL DEFAULT 1 CHECK (is_visible IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS testimonials_visible_order_idx
  ON testimonials (is_visible, order_index);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Seed contact package options (stable UUIDs for form values)
INSERT OR IGNORE INTO contact_packages (id, label, sort_order, is_active) VALUES
  ('a1111111-1111-4111-8111-111111111111', 'Under $2,500', 0, 1),
  ('a2222222-2222-4222-8222-222222222222', '$2,500 – $10,000', 1, 1),
  ('a3333333-3333-4333-8333-333333333333', '$10,000+', 2, 1);
