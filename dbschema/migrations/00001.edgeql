CREATE MIGRATION m1ti5oi5j5sdyj5y2fckyhasbcl5zrziko27rrdtchavtgsqtfisia
    ONTO initial
{
  CREATE GLOBAL default::currentUserId -> std::uuid;
  CREATE TYPE default::User {
      CREATE ACCESS POLICY only_self
          ALLOW SELECT USING ((.id ?= GLOBAL default::currentUserId));
  };
};
