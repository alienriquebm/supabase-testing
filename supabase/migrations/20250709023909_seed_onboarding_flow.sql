
INSERT INTO onboarding_flows (name, version, description, enabled)
SELECT 'Initial Onboarding', 1, 'Flujo inicial de onboarding', TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM onboarding_flows WHERE name = 'Initial Onboarding'
);

WITH flow AS (
  SELECT id FROM onboarding_flows WHERE name = 'Initial Onboarding'
)
INSERT INTO onboarding_steps (flow_id, step_order, name, component_key, metadata, enabled)
SELECT id, 1, 'Confirmar género', 'gender_confirmation',
       '{"options":["Femenino","Masculino","Otro"]}'::jsonb, TRUE
  FROM flow
WHERE NOT EXISTS (
  SELECT 1 FROM onboarding_steps
   WHERE flow_id = flow.id AND step_order = 1
)
UNION ALL
SELECT id, 2, 'Intereses', 'interest_selection',
       '{"options":["Hombres","Mujeres","Ambos"]}'::jsonb, TRUE
  FROM flow
WHERE NOT EXISTS (
  SELECT 1 FROM onboarding_steps
   WHERE flow_id = flow.id AND step_order = 2
)
UNION ALL
SELECT id, 3, 'Fecha de nacimiento', 'birthdate',
       '{}'::jsonb, TRUE
  FROM flow
WHERE NOT EXISTS (
  SELECT 1 FROM onboarding_steps
   WHERE flow_id = flow.id AND step_order = 3
)
UNION ALL
SELECT id, 4, 'Subir foto de perfil', 'upload_photo',
       '{}'::jsonb, TRUE
  FROM flow
WHERE NOT EXISTS (
  SELECT 1 FROM onboarding_steps
   WHERE flow_id = flow.id AND step_order = 4
);
