---
comments: true
excerpt: Extending our Movie example creating a REST API with TDD. Scenarios covered are Create, Read, Update and Delete.
tags:
 - testing
 - tdd
publishDate: 2023-08-17T20:52:08.052481
last-modified-purpose:
slug: /tdd/rest-api-example
image: /images/tdd-rest-api-example.png
image-fit: contain
title: TDD example for REST API - CRUD
cover-img-style: "position: relative; height:100%"
---

Before reading the current blog post, make sure you have read the previous blog post on [TDD example on a backend with Upsert Method](https://www.ankushchoubey.com/tdd-backend-example "‌") as it provides explains the thinking and the TDD stages in depth. The same thinking and stages would be used in this blog post but this post won't explain those steps in depth. Rather the post will focus on providing new information specific to REST APIs.

Like the last post, this post will only focus on the TDD aspect and therefore will be lost on other aspects. In particular, for this post, it's API Security and how HTTP Status and Responses are used. Though I'll mention what could have been done better when I come to the post.

## Continuing with the Movie example

In the previous post on [TDD on Upsert Method](https://www.ankushchoubey.com/tdd-backend-example "‌") we created a simple method in **MovieService.java** that can **upsert** data in the DB.

The signature of the methods is as follows:

```java
 Movie upsert(Movie movieToUpsert);
```

Now that we have a service method, we want to view our `Movie` in a browser. While we will cover the frontend portion of the Movies application, let's first focus on the backend API.

We decide to create a simple CRUD operation on Movie. Let's start with CREATE.

## Step 1: Planning

Planning is the first stage for us. The better we plan the less we'll have to pivot later. In the upsert example, we planned and created a skeleton. Here we'll plan and create a structure for our  APIs. This would be a mini-version of the API First Approach.

While, I am writing the CRUD API signatures below, in real life I can plan directly within the test file using [api/when/should blocks](https://www.ankushchoubey.com/method-when-should/ "‌"). You'll see the usage of the format in the APIs below.

We need to CRUD for movies via REST. Our resource is `Movie` therefore our endpoint would be `/movies`.

CRUD has 4 parts that are captured nicely by HTTP Methods.

We'll use the following:

### Create

#### Request Format

```http
POST /movies
body {
 "movieId": String,
 "movieName": String
}
```

#### Response Format

```http
200 OK if successful in saving the movie
```

### Read

For Read, we'll have two endpoints;

#### First, get all movies

##### Request Format

```http
GET /movies
```

##### Response Format

```http
200 OK
body [{
 {
   "movieId": "movie1",
   "movieName": "name of movie2"
 },
 {
  "movieId": "movie2",
  "movieName": "name of movie 2"
 },
 ...
}]
```

#### Second, to get a specific movie

##### Request Format

```http
GET /movies/{movieId}
```

##### Response Format

```http
200 OK
body {
  "movieId": String,
  "movieName": String
}
```

### Update

#### Request Format

```http
PUT /movies/{movieId}
body {
 "movieName": String
}
```

#### Response Format

```http
200 OK if successful in updating the movie
```

### Delete

#### Request Format

```http
DELETE /movies/{movieId}
```

#### Response Format

```http
200 OK if successful in deleting the movie
```

Now that we have a plan for API signatures, we can start with writing CREATE.

## Step 2: TDD on First Scenario: Create

In TDD, we always start with failing tests, however, in upsert as well as this blog post, we did planning first. An explicit plan helps get into TDD initially and it can serve as a good training wheel. Once you have crossed the training wheel, you can however use your test as a plan. And if you think about it, your tests are just a plan for your code will be written.

Some tests are easier to write without a skeleton, testing REST APIs is one of these tests.

We'll start by writing a test for an endpoint that doesn't exist. Then we'll write the code. And then move to the next scenario.

As discussed before, this post will be faster-paced than the previous TDD example.

#### Failing test

In Spring Boot, Controllers defined the REST APIs. We'll start with a **MovieControllerTest** file.

**MovieControllerTest.java**

```java
@SpringBootTest
class MovieControllerTest{
 @Autowired
 WebTestClient webTestClient;
 
 @Autowired
 MovieRepository movieRepository;

 @Nested
    @Displayname("POST /movies")
    class UpsertMethod{
        @test
        @displayname("SHOULD insert movie in the database")
        void shouldInsertMovieInTheDatabase(){
            // given: a movie
            Movie unsavedMovie = new Movie("M1", "Avengers");
         // when: POST /movies is called
          WebTestClient.Response responseSpec = webTestClient.post()
           .url("/movies")
           .bodyValue(unsavedMovie)
           .exchange();
      // then: response should be 200 OK
       responseSpec.expectResponse().isOk()
       responseSpec.expectBody().isEmpty();
            // then: movies should get saved in the database.
                Movie movieFromDatabase = movieRepository.findById(unsavedMovie.getMovieId());
                assertThat(movieFromDatabase)
                    .isNotNull()
                    .isEqualTo(unsavedMovie);
        }
    } 
}
```

In this test, we called a REST API, and then,

1. we validated if the response is 200 OK
2. we validated if the body is not present. Because this request just adds everything to the database, it need not return anything.
3. we check the database to see if the movie is saved.

Now that we have written the test, when we run it, we'll get a 404 NOT FOUND error because we haven't implemented our API.

Let's write the code,

**MovieController.java**

```java
 @RestController
 @RequestMapping("/movies")
 class MovieController{
  @Autowired
  MovieService movieService;

  @PostMapping
  ResponseEntity<Movie> postMovie(@RequestBody Movie unsavedMovie){
   Movie savedMovie = movieService.upsert(unsavedMovie);
   return ResponseEntity.ok().body(savedMovie);
  }
 }
```

We run the code and see that our test fails, this is because we passed the body and we were expecting no body.

We go ahead and modify our code.

```java
  @PostMapping
  ResponseEntity postMovie(@RequestBody Movie unsavedMovie){
   movieService.upsert(unsavedMovie);
   return ResponseEntity.ok().build();
  }
```

We run the code again, and our code passes! We switch back to code up our new scenario.

But before that, we remember, that for creation the response status should not be 200. [It should be 201 CREATED with a location header.](https://www.ankushchoubey.com/good-rest-api-design/ "‌"). So, we aren't done yet, let's make the change, starting first in the code.

PAUSE. TDD is test-first. Modifying in code isn't test-first. So, let's modify the #testFirst.

In the test, we change expecting 200 OK to 201 created and validate the location header.

When doing 201 CREATED, we send the location header which points to the URL to access the newly created resource. Since we will have a READ endpoint at `/movies/{movieId}`. I have pointed to this location.

```java
  // then: response should be 200 OK
  responseSpec.expectResponse().isCreated();
  responseSpec.expectResponse().expectHeader("location", "/movies/"+movie.getMovieId());
  responseSpec.expectBody().isEmpty();
```

The others are short.

### Read

We have two scenarios, first to get all movies and second to get a particular movie.

We'll do TDD for one scenario at a time. Starting with getting all movies

**MoviesControllerTest.java**

```java
 @Autowired
 MovieService movieService;
 
 @Nested
    @Displayname("GET /movies")
    class GetMoviesMethod{
        @test
        @displayname("SHOULD return all movies")
        void shouldReturnAllMoviesThatAreInDB(){
            // given: a few movies in the database
         Movie avengers = movieService.upsert(new Movie("M1", "Avengers"));
         Movie oppenheimer = movieService.upsert(new Movie("M2", "Oppenheimer"));
         // when: GET /movies is called
          WebTestClient.Response responseSpec = webTestClient.get()
           .url("/movies")
           .exchange();
      // then: response should be 200 OK
       responseSpec.expectResponse().isOk()
       List<Movie> responseBody = responseSpec.expectBody().ofType(new TypedReference<List<Movie>>);
            // then: movies should get saved in the database.
              assertThat(responseBody)
               .hasSize(2)
               .contains(avengers, oppenheimer);
        }
    } 
```

You may have noticed I set the variables as `avengers` and `oppenheimer`. I find writing the variable names related to domain or movies [keeps tests interesting and fun, and at the same time](https://www.ankushchoubey.com/creative-variable-names/ "‌"), it's closer to the actual movie domain.

Let's write the code,

**MovieController.java**

```java
 @RestController
 @RequestMapping("/movies")
 class MovieController{
  @Autowired
  MovieService movieService;
  
  // POST /movies code is here
 
  @GetMapping
  ResponseEntity<List<Movie>> getMovies(){
   return ResponseEntity.ok().body(movieService.getAll());
  }
 }
```

Actually, we forgot to add `getAll` method in the movie service. At this point, we'll go ahead and write a `MovieService::getAll` test and then the method while following TDD.  After that's done we'll come to the controller test again and run it and fix it until it passes.

## Let's pause

I guess you get the point.

Every time we write the test first even if it's a small change. And even when we need to add new methods to an existing class.

There is a one-on-one mapping between the code and its test. So

- **MovieController** -> **MovieControllerTest**.
- **MovieService** -> **MovieServiceTest** ([MovieService was covered in the previous post on Upsert](https://www.ankushchoubey.com/tdd-backend-example "‌"))
  //TODO

In the rest of the blogpost I'll just write test and code, just glance through it to understand it. It's pretty simple. If you have doubts, you always write a comment and I'll respond and update the post if needed.

GET a single movie

**MovieControllerTest.java**

```java
 @Nested
    @Displayname("GET /movies/{movieId}")
    class GetMoviesMethod{
        @test
        @displayname("SHOULD return a single movie")
        void shouldReturnAllMoviesThatAreInDB(){
            // given: a few movies in the database
         Movie oppenheimer = movieService.upsert(new Movie("M2", "Oppenheimer"));
         // when: GET /movies is called
          WebTestClient.Response responseSpec = webTestClient.get()
           .url("/movies/"+oppenheimer.getMovieId())
           .exchange();
      // then: response should be 200 OK
       responseSpec.expectResponse().isOk()
       Movie responseMovie = responseSpec.expectBody().ofType(Movie.class);
            // then: movies should get saved in the database.
              assertThat(responseMovie)
               .isEqualTo(oppenheimer);
        }
    } 
```

**MovieController.java**

```java
  @GetMapping("/{movieId}")
  ResponseEntity<List<Movie>> getMovies(@PathVariable String movieId){
   return ResponseEntity.ok().body(movieService.getOne(movieId));
  }
```

We'll do TDD for creating the `MovieService::getOne` method with the repository.

### Update

**MovieControllerTest.java**

```java
 @Nested
    @Displayname("PUT /movies/{movieId}")
    class GetMoviesMethod{
        @test
        @displayname("SHOULD update movie name")
        void shouldReturnAllMoviesThatAreInDB(){
            // given: save a movie in db
         Movie inception = movieService.upsert(new Movie("M3", "Inception"));
      // and: a new movie to save
         Movie inceptionUpdated = movieService.upsert(new Movie("M3", "Inception by Christopher Nolan"));
         // when: GET /movies is called
          WebTestClient.Response responseSpec = webTestClient.put()
           .url("/movies/"+inception.getMovieId())
           .body(inceptionUpdated)
           .exchange();
      // then: response should be 200 OK
       responseSpec.expectResponse().isOk()
       Movie responseMovie = responseSpec.expectBody().ofType(Movie.class);
       assertThat(responseMovie)
               .isEqualTo(inceptionUpdated);
            // then: movies should get saved in the database.
            Movie inceptionFromDB = movieRepository.findById(inception.getMovieId());
                assertThat(inceptionFromDB.getMovieName())
                    .isEqualTo(inceptionUpdated.getMovieName());
        }
    } 
```

**MovieController.java**

```java
  @GetMapping("/{movieId}")
  ResponseEntity<List<Movie>> putMovies(@PathVariable String movieId, @ResponseBody Movie movie){
   return ResponseEntity.ok().body(movieService.upsert(new Movie(movieId, movie)));
  }
```

You may have noticed I did some duplicate bad code. I usually [separate request, response, and entity objects](https://www.ankushchoubey.com/2023/01/07/Separating_Request,_Entity_and_Response.html "‌"), but this isn't a scope for that so skipping for now.

### Delete

**MovieControllerTest.java**

```java
 @Nested
    @Displayname("DELETE /movies/{movieId}")
    class DeleteMoviesMethod{
        @test
        @displayname("SHOULD remove the movie from DB")
        void shouldReturnAllMoviesThatAreInDB(){
            // given: save a movie in db
         Movie inception = movieService.upsert(new Movie("M3", "Inception"));
         // when: DELETE /movies/{movieId} is called
          WebTestClient.Response responseSpec = webTestClient.delete()
           .url("/movies/"+inception.getMovieId())
           .exchange();
      // then: response should be 200 OK
       responseSpec.expectResponse().isOk()
       responseSpec.expectBody().isEmpty();
            // then: movies should get saved in the database.
            Movie inceptionFromDB = movieRepository.findById(inception.getMovieId());
                assertThat(inceptionFromDB)
           .isNull();
        }
    } 
```

**MovieController.java**

```java
  @GetMapping("/{movieId}")
  ResponseEntity<List<Movie>> deleteMovies(@PathVariable String movieId){
   movieService.delete(movieId);
   return ResponseEntity.ok().build();
  }
```

Again we do TDD, do build the code.

I'll be adding a GitHub link with the code as soon as I'm in the final stage of the series. It's a #todo for me.

## Closing

What you may have noticed is, we never ran Postman or Swagger to test our REST APIs. We just ran the tests. And we didn't even start the code. #todo: add a link here to the blog post on TDD RedFlags. When doing TDD we usually don't need to start the application.

All that debugging time that would have taken with Postman is now a documented-automated test. That we can run many times.

There are a lot of things that can be done for REST API TDD. Request Validation, checking for user permissions, correct status response, etc and these things are quite standing. I'll be writing a cheat sheet version for REST API TDD soon. #todo: link to Rest Api TDD Cheatsheet.
