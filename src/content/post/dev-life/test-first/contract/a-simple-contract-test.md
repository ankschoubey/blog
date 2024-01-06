---
comments: true
excerpt: Response during unit tests can be saved in files which can be used for Testing UI.
tags:
 - technical
 - tdd
 - testing
publishDate: 2024-01-07T20:52:08.052481
last-modified-purpose:
slug: /tdd/simple-contract-test/
title: A Simple Vanila Contract Test between Backend and Frontend
image: /images/tdd-simple-contract-test.png
---

## What is Contract Testing?

Contract Testing allows for establishing a "contract" between two distributed systems. This can be between a backend and a frontend or between two services.

The main aim of a contract test is to establish the format between the client and the server! If the structure of the API response changes, the unit tests on the client side are broken until the code is updated.

This way, the server and its clients' format are in sync.

There are two parts to a contract test:

1. Server: This creates the contract. This contract can be shared with a client.
2. Client: This consumes the contract and runs its unit tests against it.

# How can one achieve a simple contract?

There are many tools available for contract testing:

- Spring Cloud Contract: Mostly used in Spring Boot Environment. It does support other languages, but it's more challenging than spring.
- Pact: Can be used with different programming languages more easily.

I have tried Spring Cloud Contract, but it can be a hassle. Here's a simpler version: I have developed a #vanilla approach.

When we write Unit tests for our API, save those responses in a file. Use these responses in your client.

For me, the client was a React Application. Here, we kept a Mock JSON that represents how the response from the server will be. We would create this JSON manually.

Instead of manually creating and maintaining the JSON, we can use the same backend contract saved as a file in this JSON.

Here's the code snippet for Spring Boot.

```java
public void exportRestResponse(String resource, HttpMethod httpMethod, HttpStatus httpStatus, String url, WebTestClient.Response responseSpec){
	String data = responseSpec.expectBody(String.class).getEntityResponse().getBody();
	... you can also beautify this JSON string.
	
	String name = httpMethod + " " + httpStatus + " " + url.replaceAll("\\", "-");
	... we can't save \ as the file name. So replaced \ with -
	
	Path path = new Path("/contracts/"+resource+"/" + name + ".json");
	FileUtils.save(path, data);
}
```

I would then use it within the tests.

```java
// when:
WebTestClient.ResponseSpec responseSpec = webTestClient.get("/movies");
// then:
responseSpec.expectStatus().isOk().expectBody(List.class);
... assert all other errors

// save contract:
exportRestResponse("movies", HttpMethod.GET, HTTPStatus.OK, "/movies", responseSpec);
```

This would export a file.

```
/contracts/movies/GET 200 -movies.json
```

I wanted it easy to file a contract, so this is in the file name syntax I adopted

```
/contracts/{resource}/{httpMethod} {httpStatus} {url}.json
```

This way, I created a simple contract between the back and front end. These contracts can be copied to the frontend whenever the tests run, and frontend tests can run too.

One can create a simple CI pipeline to automate this further.