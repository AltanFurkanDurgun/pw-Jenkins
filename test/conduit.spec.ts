import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

let slugId;

test("new article", async ({ request }) => {
  console.log('Bu test şu worker üzerinde çalışıyor:', process.env.TEST_WORKER_INDEX);
  
  const newArticleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "New Article_" + faker.person.firstName(),
          description: "New Article Descpription_" + faker.person.gender(),
          body: "New Article Body_" + faker.person.jobArea(),
          tagList: ["Playwright"],
        },
      },
    }
  );
  if (newArticleResponse.status() != 200) {
    console.log(newArticleResponse.url());
    console.log("Response body= " + (await newArticleResponse.text()));
  }
  expect(newArticleResponse.status()).toEqual(201);
  console.log(newArticleResponse.statusText()); //statusü text olarak basar
  console.log(await newArticleResponse.text()); //response body i json olarak basar
  const headers = newArticleResponse.headers();
  console.log(headers["content-type"]);
  console.log(newArticleResponse.headersArray());//headersı olduğu gibi basar
  const responseBody = await newArticleResponse.json();
  slugId = await responseBody.article.slug;
  console.log("Slug Id= " + slugId);
});

test("Update article", async ({ request }) => {
  console.log('Bu test şu worker üzerinde çalışıyor:', process.env.TEST_WORKER_INDEX);

  const updateResponse = await request.put(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
    {
      data: {
        article: {
          title: "New Article update_" + faker.person.jobTitle(),
          description: "New Article Descpription update_" + faker.person.jobType(),
          body: "New Article Body update_" + faker.person.jobDescriptor(),
          tagList: ["playwright", "Cucumber"],
          slug: `${slugId}`,
        },
      },
    }
  );
  expect(updateResponse.status()).toEqual(200);
  console.log(updateResponse.statusText());
  const responseBody = await updateResponse.json();
 // expect(responseBody.article.title).toBe("New Article update");
  slugId = await responseBody.article.slug;
  console.log("New slugId= " + slugId);
});

test("delete article", async ({ request }) => {
  console.log('Bu test şu worker üzerinde çalışıyor:', process.env.TEST_WORKER_INDEX);

  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`
  );
  expect(deleteArticleResponse.status()).toEqual(204);
  console.log("Status text= " + deleteArticleResponse.statusText());
});
