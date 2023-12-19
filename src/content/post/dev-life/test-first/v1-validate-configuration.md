---
comments: true
description: With TDD, you don't find any logical bugs. The remaining types of bugs are data bugs and configuration bugs. This article discusses configuration validations to find and fix config bugs.
tags:
 - testing
 - devops
 - configuration-management
 - tdd
publishDate: 2023-05-16T20:52:08.052481
last-modified-purpose:
permalink: /v1/validate-configuration
title: Automate Validation of Your Configuration
---

After doing TDD well, you almost don’t get any logical bugs. Now the bugs you do get are all data bugs. Or configuration bugs.

Data Bugs can be solved with TDD, just validate all the data that comes into the system. [I have an article about it.](/pre-save-data-validation)

The other type of bug is a **configuration bug**.

**Example**: You have connected to a service that does not exist yet.

You can run the below types of analyzers in your continuous integration **before merging**. You can combine this with validation when the app starts. The app should fail to start if the validation fails.

## Static analysers

You can find many linters and resources that can help validate static files.

You can also use static analysis tools to validate if your `yaml` or `properties` is structured properly.

Static analysers like Sonar can also be useful.

For example: Helm has a linter which can be used by the command `helm lint`

Here are some more:

- [Validating Kubernetes YAML for best practice and policies](https://learnk8s.io/validating-kubernetes-yaml "‌")
- [Dockerfile Linter](https://github.com/hadolint/hadolint "‌")

## Dry run

Many systems allow for doing a dry run. A dry run is where you list down everything that would happen during deployment. This would also show any errors that can come up during deployment.

For example: You can use `helm install <chart> --dry-run` to simulate how the execution would happen. If there are any perceived failures, it would be reported.

## Making custom analysers

To make a validation, this of all the ways validation can fail. Then add custom validations that could easily detect these errors. This can be done via the application itself

### Validating with custom scripts (use this for multiple applications)

Here are some ideas that can be easily implemented with some Python scripts:

1. If you are deploying to Kubernetes, before your merge, validate if the image actually exists.
2. If you have URLs in your properties files, make sure those URLs are active.
3. If a certain field needs to be base64. verify that it is actually base64 or not.

### Validating within the application (for app-specific validations)

If you have a Spring Boot, you can use `@ConfigurationProperties` with `@Validated` and `javax` validations.

If you are using ENV files in a NodeJs application, you can manually add in a code to validate the config and throw an error if it exists.
