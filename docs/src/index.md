---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Nust"
  text: Enhanced Nuxt backend  
  tagline: "A Nuxt module that provides NestJS-like features to your Nuxt backend"
  image:
    src: /logo-small.svg
  actions:
    - theme: brand
      text: Get started
      link: /guide/setup
    - theme: alt
      text: Overview
      link: /guide/overview
    - theme: alt
      text: Github
      link: https://github.com/sweetscript/nuxt-nust

features:
  - title: Controllers & Decorators
    details: Organise and structure your server handlers using the standard resource convention used by most Backend frameworks.
  - title: Validation & Transformers
    details: Easily validate and transform DTOs using class-validator and class-transformer which the module provides built-in support, similar to the NestJS implementation.
  - title: Better Doc/OpenAPI support
    details: Use Api decorators to enhance your scalar/swagger documentation.
---


::: warning
Still in development, Contributions are welcome
:::
