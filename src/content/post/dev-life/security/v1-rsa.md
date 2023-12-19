---
comments: true
description: Placeholder 
tags:
 - security
publishDate: 2023-02-01T20:52:08.052481
last-modified-purpose: 
permalink: /v1/rsa
title: RSA Algorithm
toc: false
image: /images/v1-rsa/rsa-creators.jpeg
---

RSA is an asymmetric key encryption algorithm and was first published in 1977.

RSA was created by Ron Rivest, Adi Shamir and Leonard Adleman.

![](/images/v1-rsa/rsa-creators.jpeg)

Adding their photo for inspiration.

RSA works on the concept of modular arithmetic.

In RSA, we have a public and a private key. We use the private key to decrypt and the public key to encrypt.

This means that the private key should not be shared. But the public key can be shared with anyone.

Private Key = Key
Public Key = Lock

---

There are 5 steps in RSA.

1. Take two prime numbers p and q. (Eg: p=2, q=7)
2. Calculate `N` . `N` is the product of p and q. (N = p\*q = 2\*7 = 14)
3. Calculate `Phi(N)` .
 1. This is the number of co-primes less than N. (Eg. 1, 2, 5, 7 and 11 are co-primes to 14; therefore `Phi(n)`  is the count = 6)
 2. This can also be calculated with a formula `(p-1)(q-1)`
 3. Eg; `Phi(N)`  = (2-1)(7-1) = 6
4. Create the public key (e) such that
 1. 1 < `e`  < `Phi(N)`
 2. E should be co-prime with Phi(N)
 3. Eg. e = 5
5. Find the private key (d) such that
 1. (e\*d) mod `Phi(n)` = 1
 2. Eg: (5\*d) mod (14) = 1
 3. When you calculate this you’ll see a pattern.

- 5\*1 = 5; mod 6 =  5
- 5\*2 = 10; mod 6 = 4
- 15 mod 6 = 3
- ...
- 25 mod 6 = 1
- 30 mod 6 = 0
This pattern is expected since (5\*6)%6 will be 0.

Let’s pick a large `d` .

`D = 11`

Not to encrypt you’ll do the following,

```
(value^e) mod N
```

To decrypt, you’ll do the following,

```
(encryptedValue ^d) mod N
```

---

## Resources

[Eddie Woo: The RSA Encryption Algorithm (1 of 2: Computing an Example)](https://www.youtube.com/watch?v=4zahvcJ9glg)

[The RSA Encryption Algorithm (2 of 2: Generating the Keys)](https://www.youtube.com/watch?v=oOcTVTpUsPQ)

[RSA Calculator](https://www.cs.drexel.edu/~jpopyack/IntroCS/HW/RSAWorksheet.html)
