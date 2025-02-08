---
title: How short, clean and clear can we write Java?
excerpt: Thoughts on making Java clear and precise
slug: /software-blog/making-java-short/
images: /images/software-blog/making-java-short.png
tags:
  - technical
  - non-technical
publishDate: 2025-01-11T20:49:37.015737
gpt: chatgpt url
trello: ''
seo_keywords:
seo_descriptions: s
---

Our code is pretty big, even though in reality they only do a small thing.

I have realized there are two main reason why our codebases are bloat, boilerplate and long variable names.

I have come to a belief that a knowledge of what a mid sized company’s codebase can be merged into a single book.

I’ll explain how I came to that conclusion and as you’ll see I’m pushing things to their limit but I think it’s doable. In the end this kind of leads to a DSL of sorts.

The aim is to reduce number of characters not just number of line.

### Sample Code

Assume this frictional example.

```java
@Component
public class OrderService {
 private final PaymentService paymentService;
 private final OrderRepository orderRepository;
 private final OrderMapper orderMapper;

 public OrderService(
  PaymentService paymentService,
  OrderRepository orderRepository.
  TransactionTemplate transactionTemplate,
  OrderMapper orderMapper
 ){
  this.paymentService = paymentService;
  this.orderRepository = orderRepository;
  this.orderMapper = orderMapper;
 }

 @Transactional
 public OrderResponse processOrderPayment(OrderId orderId, UserId userId, int amount){
  Preconditions.notNull(orderId);
  Preconditions.positive(amount);

  final Optional<Payment> recentPayment = paymentService.getRecentPayment(userId, amount);

  if(recentPayment.isEmpty()){
   throw new NoPaymentException("...message...");
  }

  final Order order = orderRepository.findById(orderId)
   .orElseThrow(()-> new NotFoundException("Assume a message"));

  order.amountReceived(amount);

  final Order savedOrder = orderRepository.save(order);

  return orderMapper.map(savedOrder);
 }
}
```

Line Count:
Character Count:

## Simple Lombok Optimizations

Some of these are common knowledge.

Instead of manual constructor we'd use `@RequiredArgsContructor`

Instead of variable declaration by type we'd `val`. We could have used java's `var` if we didn't want to use final

```java
@Component
@RequiredArgsContructor
public class OrderService {
 private final PaymentService paymentService;
 private final OrderRepository orderRepository;
 private final OrderMapper orderMapper;

 @Transactional
 public OrderResponse processOrderPayment(OrderId orderId, UserId userId, int amount){
  Preconditions.notNull(orderId);
  Preconditions.positive(amount);

  val recentPayment = paymentService.getRecentPayment(userId, amount);

  if(recentPayment.isEmpty()){
   throw new NoPaymentException("...message...");
  }

  val order = orderRepository.findById(orderId)
   .orElseThrow(()-> new NotFoundException("Assume a message"));

  order.amountReceived(amount);
  val savedOrder = orderRepository.save(order);

  return orderMapper.map(savedOrder);
 }
}
```

Line Count:
CharacterCount:

## More Lombok Optimizations

Note how we always use `private final`. We could remove it useing an experimentatl lombok feature. `@FieldDefaults`.

By default the fieldsDefault is declared like this

```java
@FieldDefaults(access=PRIVATE, makeFinal=true)
public class OrderService
```

but we can add it to our lombok properties to always make access private and final true

```
todo
```

Finally it'll look like this

```java
@Component
@RequiredArgsContructor
@FieldsDefaults
public class OrderService {
 PaymentService paymentService;
 OrderRepository orderRepository;
 OrderMapper orderMapper;

 @Transactional
 public OrderResponse processOrderPayment(OrderId orderId, UserId userId, int amount){
  Preconditions.notNull(orderId);
  Preconditions.positive(amount);

  val recentPayment = paymentService.getRecentPayment(userId, amount);

  if(recentPayment.isEmpty()){
   throw new NoPaymentException("...message...");
  }

  val order = orderRepository.findById(orderId)
   .orElseThrow(()-> new NotFoundException("Assume a message"));

  order.amountReceived(amount);
  val savedOrder = orderRepository.save(order);

  return orderMapper.map(savedOrder);
 }
}
```

Line count :
characterCount

## JPA Optimization

We have opened up a transactional.

The way spring works if we have a Transactional, we don't need to call save explicitly because ...

So we can remove one more line

```java
@Component
@RequiredArgsContructor
@FieldsDefaults
public class OrderService {
 PaymentService paymentService;
 OrderRepository orderRepository;
 OrderMapper orderMapper;

 @Transactional
 public OrderResponse processOrderPayment(OrderId orderId, UserId userId, int amount){
  Preconditions.notNull(userId);
  Preconditions.notNull(orderId);
  Preconditions.positive(amount);

  val recentPayment = paymentService.getRecentPayment(userId, amount);

  if(recentPayment.isEmpty()){
   throw new NoPaymentException("...message...");
  }

  val order = orderRepository.findById(orderId)
   .orElseThrow(()-> new NotFoundException("Assume a message"));

  order.amountReceived(amount);

  return orderMapper.map(order);
 }
}
```

Line count :
characterCount

## Static Imports

Note how we always use `Preconditions.` to use the static method we can use `notNull` directly with static import.

Also, not how we used `recentPayment.isEmpty()`. This is not needed. we could just ise orElseThrow

```java
@Component
@RequiredArgsContructor
@FieldsDefaults
public class OrderService {
 PaymentService paymentService;
 OrderRepository orderRepository;
 OrderMapper orderMapper;

 @Transactional
 public OrderResponse processOrderPayment(OrderId orderId, UserId userId, int amount){
  notNull(userId);
  notNull(orderId);
  positive(amount);

  paymentService.getRecentPayment(userId, amount).orElseThrow(()-> new NotFoundException("...message...");
  }

  val order = orderRepository.findById(orderId)
   .orElseThrow(()-> new NotFoundException("...message..."));

  order.amountReceived(amount);

  return orderMapper.map(order);
 }
}
```

Line Count:
CharacterCount:

### Lombok Extension Method

Note how we have a duplicate `orElseThrow` line?

```
.orElseThrow(()-> new NotFoundException("...message...")
```

What if we could extend Optional and have method `orThrowNotFound()`

Optional is a final method so we can't extend it. But Lombok has a ExtensionMethod which allows us to add a method to exiting class.

In reality, it'll just some lombok magic.

Assume class

```java
class CustomExtension {

 public <T> T orThrowNotFound(Optional<T> optional){
  return optional.orElseThrow(()-> new NotFoundException("...message...")
 }

 public int checkPositive

}

```

Using the extension

```java
@Component
@RequiredArgsContructor
@FieldsDefaults
@ExtensionMethod(CustomExtension.class)
public class OrderService {
 PaymentService paymentService;
 OrderRepository orderRepository;
 OrderMapper orderMapper;

 @Transactional
 public OrderResponse processOrderPayment(OrderId orderId, UserId userId, int amount){
  checkNotNull(userId);
  checkNotNull(orderId);
  checkPositive(amount);

  paymentService.getRecentPayment(userId, amount).orThrowNotFound();

  val order = orderRepository.findById(orderId)
   .orThrowNotFound();

   order.amountReceived(amount);

  return orderMapper.map(order);
 }
}
```

Line Count:
CharacterCount;

### Chaining

I like chaining.

```java
@Component
@RequiredArgsContructor
@FieldsDefaults
@ExtensionMethod(CustomExtension.class)
public class OrderS {
 PaymentService paymentService;
 OrderRepository orderRepository;
 OrderMapper orderMapper;

 @Transactional
 public OrderResponse processOrderPayment(OrderId orderId, UserId userId, int amount){
  checkNotNull(userId);
  checkNotNull(orderId);
  checkPositive(amount);

  paymentService.getRecentPayment(userId, amount).orThrowNotFound();

  val order = orderRepository.findById(orderId)
   .orThrowNotFound()
   .amountReceived(amount);

  return orderMapper.map(order);
 }
}
```

Line Count:
CharacterCount;

## Abbreviateion

How far can you take abbreviations

We have a habit of writing long names.

- If Entity is Movie
- ⁠We’ll write MovieRepository
- ⁠MovieService
- ⁠MovieController

If something is so repeated, why not use abbreviations?
Why not just?

- Movie -> Remains Movie
- ⁠MovieRepository -> MovieRepo -> MovieR
- ⁠MovieService -> MovieS
- ⁠MovieController -> MovieCtr -> MovieC

```java
@Component
@RequiredArgsContructor
@FieldsDefaults
@ExtensionMethod(CustomExtension.class)
public class OrderService {
 PaymentS paymentS;
 OrderR orderR;
 OrderM orderM;

 @Transactional
 public OrderRes processOrderPayment(OrderId orderId, UserId userId, int amount){
  paymentS.getRecentPayment(userId.nn(), amount.positive()).orThrowNotFound();

  val order = orderR.findById(orderId.nn())
   .orThrowNotFound()
   .amountReceived(amount);

  return orderM.map(order);
 }
}
```

Line Count:
CharacterCount;

### Custom Dynamic Proxy

```java
@Component
@RequiredArgsContructor
@FieldsDefaults
@ExtensionMethod(CustomExtension.class)
public class OrderService {
 PaymentS paymentS;
 OrderR orderR;
 OrderM orderM;

 @Transactional
 public OrderRes processOrderPayment(OrderId orderId, UserId userId, @Positive int amount){
  paymentS.getRecentPayment(userId, amount).orThrowNotFound();

  val order = orderR.findById(orderId)
   .orThrowNotFound()
   .amountReceived(amount);

  return orderM.map(order);
 }
}
```

Line Count:
CharacterCount;

### Custom Repository Wrapper

```java
@Component
@RequiredArgsContructor
@FieldsDefaults
@ExtensionMethod(CustomExtension.class)
public class OrderService {
 PaymentS paymentS;
 OrderR orderR;
 OrderM orderM;

 @Transactional
 public OrderRes processPayment(OrderId orderId, UserId userId, @Positive int amount){
  paymentS.getRecentPayment(userId, amount).get();

  val order = orderR.byId(orderId)
  .amountReceived(amount);

  return orderM.map(order);
 }
}
```

Line Count:
Character Count:

## Ending

We pushed the limits there of what was possible with java and lombok.

In practice, I would use @FieldsDefaults and `@ExtensionMethod` in production code since they are an experimental lombok feature.

But I would use them to improve test classes.

Also, it's worth checking out: <https://github.com/peichhorn/lombok-pg>

Also, using

What do you think?

Boilerplate.

private static yuck replaced with Lombok’s FieldDefaults

We do now use lombok’s @Getter @Setter often.

for variable declaration always val or var.

## Resources

<https://github.com/peichhorn/lombok-pg>
