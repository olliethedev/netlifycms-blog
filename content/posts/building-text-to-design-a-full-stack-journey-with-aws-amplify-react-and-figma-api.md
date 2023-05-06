---
title: "Building Text To Design: A Full Stack Journey with AWS Amplify, React,
  and Figma API"
date: 2023-05-06T17:11:58.912Z
---
# Building Text-To-Design Figma Plugin

Unveiling the complexity behind a simple user interface, this article seeks to shed light on the technical odyssey of building the [Text To Design](https://www.texttodesign.ai/) Figma Plugin. This powerful tool, capable of converting text prompts into design elements, symbolizes a fusion of AI and UX design. While users enjoy the seamless interaction, a robust architecture works tirelessly under the hood, connecting various dots in the background.

![](/img/text-to-design-arch.drawio.png)

## Frontend Magic with React and Figma API

The frontend of the plugin is a classic React UI. React's component-based architecture provides a solid foundation for building user interfaces. Its declarative nature makes the code more predictable and easier to debug, while the rich ecosystem of libraries and tools enables rapid development.

However, when it comes to Figma plugins, one has to make an exception in terms of storage. Figma plugins run in an isolated JavaScript environment, meaning they don't have access to modules such as `localStorage` or `fetch`. This limitation is addressed using Figma's `figma.clientStorage` API, which allows storing and retrieving simple data.

## Backend Powerhouse with AWS Amplify

The backend is where the real heavy-lifting happens. Built with AWS Amplify, it capitalizes on the benefits offered by this comprehensive set of tools and services. Amplify simplifies the process of setting up scalable and secure cloud services, allowing developers to focus on the application logic.

The handling of Language Model (LLM) action prompts was a significant challenge that was met with an innovative solution. Each LLM action prompt is transformed into a separate work task. The advantage of this approach is twofold: Firstly, it provides the ability to chain tasks in different sequences, giving flexibility in handling complex workflows. Secondly, it allows for the retry of failed tasks, enhancing the system's resilience.

## Navigating Amazon API Gateway's Timeout Limit

An important aspect of the backend is the REST serverless API that interfaces with the AI functions. However, we faced a hurdle with the Amazon API Gateway's 30-second timeout limit. This limit could prove restrictive for some tasks, particularly those involving complex AI computations.

To overcome this, we adopted a task worker implementation. When a new call comes in, a new work task is created, which a task worker will eventually process. This workaround ensures that we don't run into timeout issues and can handle tasks that require longer processing times.

## Seamless Data Flow with AppSync

Once a task is completed, the changes are saved via AppSync, which in turn updates the appropriate model in the database. AppSync offers real-time updates and offline capabilities, making it a robust solution for managing application data.

The frontend is simultaneously notified of the AppSync model change, ensuring a seamless flow of data between the backend and frontend. This results in a responsive user interface that stays updated with the latest changes.

## Cognito Authentication for Secure Access

The plugin uses Cognito for authentication, employing a passwordless login mechanism with email codes. This approach not only enhances security but also simplifies the user experience, as users don't have to remember another password.

## C﻿onclusion

In summary, the [Text To Design](https://www.texttodesign.ai/) Figma plugin is a testament to the power of combining modern development tools and practices. It demonstrates how challenges can be transformed into innovative solutions, resulting in a tool that bridges the gap between AI and UX design. As we continue to evolve and improve, we look forward to bringing even more advanced capabilities to our users, pushing the boundaries of what's possible with AI and design.