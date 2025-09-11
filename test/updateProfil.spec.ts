import { expect, test } from "@playwright/test";



test("update image url", async ({ request }) => {
  console.log('Bu test şu worker üzerinde çalışıyor:', process.env.TEST_WORKER_INDEX);

  const updateImgResponse = await request.put(
    "https://conduit-api.bondaracademy.com/api/user",
    {
      data: {
        user: {
          image: "update new",
          username: "",
          bio: "",
          email: "",
          password: "",
        },
      },
    }
  );
  expect(updateImgResponse.status()).toBe(200)
  const response = await updateImgResponse.json();
  console.log("image text= " + response.user.image);
});
