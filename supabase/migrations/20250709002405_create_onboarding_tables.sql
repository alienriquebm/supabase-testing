
CREATE TABLE IF NOT EXISTS profiles (
  id             SERIAL PRIMARY KEY,
  plaid_user_id  VARCHAR UNIQUE,
  email          VARCHAR NOT NULL UNIQUE,
  password_hash  VARCHAR NOT NULL,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at     TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS onboarding_flows (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR NOT NULL,
  version     INT NOT NULL DEFAULT 1,
  description TEXT,
  enabled     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS onboarding_steps (
  id            SERIAL PRIMARY KEY,
  flow_id       INT NOT NULL REFERENCES onboarding_flows(id) ON DELETE CASCADE,
  step_order    INT NOT NULL,
  name          VARCHAR NOT NULL,
  component_key VARCHAR NOT NULL,
  metadata      JSONB,
  enabled       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT ux_flow_order UNIQUE(flow_id, step_order)
);

CREATE TABLE IF NOT EXISTS user_onboarding (
  id           SERIAL PRIMARY KEY,
  user_id      INT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  flow_id      INT NOT NULL REFERENCES onboarding_flows(id),
  status       VARCHAR NOT NULL DEFAULT 'in_progress',
  started_at   TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS user_onboarding_steps (
  user_onboarding_id INT NOT NULL REFERENCES user_onboarding(id) ON DELETE CASCADE,
  step_id            INT NOT NULL REFERENCES onboarding_steps(id),
  status             VARCHAR NOT NULL DEFAULT 'pending',
  started_at         TIMESTAMP WITH TIME ZONE,
  completed_at       TIMESTAMP WITH TIME ZONE,
  CONSTRAINT ux_user_step UNIQUE(user_onboarding_id, step_id)
);
