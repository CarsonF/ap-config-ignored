module default {
  global currentUserId: uuid;

  type User {
    access policy only_self
    allow select using (
      .id ?= global currentUserId
    );
  }
}
