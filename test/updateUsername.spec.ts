import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("update username", async ({ request }) => {
  console.log(
    "Bu test şu worker üzerinde çalışıyor:",
    process.env.TEST_WORKER_INDEX
  );

  const fakerUsername = faker.person.firstName();
  const updateImgResponse = await request.put(
    "https://conduit-api.bondaracademy.com/api/user",
    {
      data: {
        user: {
          image: "",
          username: "User_" + fakerUsername,
          bio: "",
          email: "",
          password: "",
        },
      },
    }
  );

  if (updateImgResponse.status() != 200) {
    console.log(updateImgResponse.url());
    console.log("Response body= " + (await updateImgResponse.text()));
  }
  expect(updateImgResponse.status()).toBe(200);
  const response = await updateImgResponse.json();
  console.log("Username text= " + response.user.username);
});
