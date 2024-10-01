import { generateAPIKey } from "@monorepo/common";
import type { GenerateAPIKeyProps } from "@monorepo/types";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "./db";

const app = new Hono();
app.use(cors({
  origin: "http://localhost:5173"
}));

app.get("/", (c) => {
  return c.json({
    message: "Hello! The API is working!"
  })
});

app.get("/keys", async (c) => {
  const keys = await db.key.findMany();
  return c.json(keys);
});

app.get("/keys/:id", async (c) => {
  const id = c.req.param('id');
  const key = await db.key.findUnique({
    where: {
      id
    }
  });
  return c.json(key);
});

app.post("/keys", async (c) => {
  const props = await c.req.json() as GenerateAPIKeyProps;

  if (!props.ownerId) {
    return c.json({
      error: "Missing ownerId"
    }, 400);
  }

  const newKeyData = await generateAPIKey(props);
  const key = await db.key.create({
    data: {
      key: newKeyData.key,
      ownerId: newKeyData.ownerId,
      env: newKeyData.env,
      name: newKeyData.name,
      permissions: newKeyData.permissions,
    }
  });
  return c.json(key);
});

app.all("/validate", async (c) => {
  if (!["GET", "POST"].includes(c.req.method)) {
    return c.json({
      error: "Method not allowed"
    }, 405);
  }
  const [headerKey, queryKey] = [
    c.req.header('x-api-key'),
    c.req.query("key")
  ];
  let bodyKey = null;
  if (c.req.method === "POST") {
    const body = await c.req.json();
    bodyKey = body.key;
  }

  const key = headerKey || bodyKey || queryKey;

  if (!key) {
    return c.json({
      valid: false
    });
  };
  
  const isValid = await db.key.update({
    where: {
      key
    },
    data: {
      usageCount: {
        increment: 1,
      },
    }
  }).catch(() => null).then((key) => {
    if (!key) {
      return false;
    }

    return true;
  });

  return c.json({
    valid: isValid
  });
});

app.delete("/keys/:id", async (c) => {
  const id = c.req.param('id');
  const key = await db.key.delete({
    where: {
      id
    }
  });
  return c.json(key);
});

export default {
  fetch: app.fetch.bind(app),
  port: 3000
}