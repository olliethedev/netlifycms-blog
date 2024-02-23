---
title: Solving Hard Problems - Figma AI Assistant
date: 2024-02-23T15:47:43.883Z
---
![](https://media.licdn.com/dms/image/D5612AQGCDqUZqrl_Fg/article-inline_image-shrink_1500_2232/0/1705332400709?e=1714003200&v=beta&t=vYlqCtW1foatvl5ZAd2dZ8UN3Ptrj9PgYaA2JXOTIXA)\
\
**[Text to Design](https://www.figma.com/community/plugin/1234140943476658588/text-to-design-ai-assistant)** Figma plugin might look like magic. But the recent improvements to the plugin are no accident.

They are a result of many months of experimentation with AI prompting, UI/UX, and multimodal LLMs.

**Here are some interesting discoveries:**

## Increasing Information Density Per Token

The plugin works by using a LLM to generate HTML+CSS which then gets converted to all the different Figma element types you see in the Figma Layers panel.

The initial version of the plugin was simply generating raw CSS and HTML, but to increase the speed and quality of the output I had to figure out a way to pack as much styling data into the generated code as possible all while keeping the system prompts and output short, and hallucination free.

The solution was to prompt the LLM to work with higher-level styling abstractions using Tailwind and FontAwesome CSS classes for the vector icons. This resulted in better quality results, fewer hallucinations, and faster generation time, as the results had a higher information density per token.

A lot more can be done in terms of higher levels of abstraction in the future.

Below is the difference between the old and new approach:

![](https://media.licdn.com/dms/image/D5612AQEbZ_MPzRNo1w/article-inline_image-shrink_1000_1488/0/1705332100717?e=1714003200&v=beta&t=uWPM9A9AYedaiwkCbA3_8GP4iF3Gdl247OgiRReyWvk)

## Inlining the Design Preview

The biggest UX improvement since the initial release was the inline design preview.

In the initial plugin release, I had three different chat modes that a user had to switch between, one for general conversations but no design generation, the second just for design generation but no conversations and the third is just image gen. This resulted in a poor UX.

To solve this UX nightmare, I merged the chat and design modes into one. This allows the user to ask questions and make changes to the designs, within a single conversation context.

Here is a high-level breakdown of how the LLM chat responses are rendered:

![](https://media.licdn.com/dms/image/D5612AQEI-_EbFUitGw/article-inline_image-shrink_1000_1488/0/1705332112630?e=1714003200&v=beta&t=UclTcy7Ppn4TS77_DKUeqDCeoPlws_4ZqhJroovluJo)

Future improvements would be to merge the image generation mode into a single unified chat.

## Multimodal Magic

The last challenge! How do I allow users to modify their existing Figma elements by chatting with an LLM?

The initial obvious solution is to take existing Figma elements and convert them to an HTML representation, passing the result to an LLM.

However, in November OpenAI launched a multimodal chatGPT model, which surprisingly yielded better results at a lower token cost. With this came the added benefit of being able to convert ANY visual input (existing designs, website screenshots, doodles, wireframes, mobile app screens, etc) to HTML and ultimately Figma elements.

Win-Win.

![](https://media.licdn.com/dms/image/D5612AQEj8pNr8cTeZw/article-inline_image-shrink_1000_1488/0/1705332123990?e=1714003200&v=beta&t=ax-RIKB35a6E4lg-gtiZicYmEAnrlXHEXms9m4t491A)

Future improvements would be to use the existing Figma design system from the user's project (components and styles) to generate designs that when imported use existing components and not just copies.

## Conclusion

If you are building a SaaS that uses LLMs, be prepared to stay laser-focused on a single problem for days or even weeks, while testing novel solutions and researching the latest developments, and your results will look like magic!

Happy building,

Ollie 🍻