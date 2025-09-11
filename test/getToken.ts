import { test } from "@playwright/test";
import fs from "fs";
import path from "path";

const authFilePath = ".auth/token.json";

test("share auth", async ({request }) => {
  const newArticleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user: { email: "test98fa@gmail.com", password: "12345678" },
      },
    }
  );
  const responseBody = await newArticleResponse.json();
  const accessToken = responseBody.user.token;

  if (!fs.existsSync(path.dirname(authFilePath))) {
    fs.mkdirSync(path.dirname(authFilePath), { recursive: true });
  }
  //Eğer auth dosyası yoksa oluşturmayı sağlar

  /* Token'ı JSON formatında kaydet
          null → filtreleme yapma
           2 → her girinti 2 boşluk olsun
           */
  fs.writeFileSync(
    authFilePath,
    JSON.stringify({ token: accessToken }, null, 2)
  );

  console.log("Token saved to", authFilePath, "Token= " + accessToken);
  process.env["ACCESS_TOKEN"] = accessToken;
});
