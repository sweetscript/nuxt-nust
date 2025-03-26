import { defineConfig } from 'vitepress';
import {
  ApiConflictResponse,
  Controller,
  Inject,
} from '../../src/runtime';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nust',
  description:
    'A Nuxt module that provides NestJS-like features to your Nuxt backend',
  srcDir: './src',
  head: [['link', { rel: 'icon', href: '/nuxt-nust/favicon.ico' }]],
  base: '/nuxt-nust/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo.svg',
      dark: '/logo-invert.svg',
      alt: 'logo',
    },
    siteTitle: false,

    editLink: {
      pattern:
        'https://github.com/sweetscript/nuxt-nust/edit/master/docs/:path',
    },
    externalLinkIcon: true,

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Example',
        target: '_blank',
        link: 'https://stackblitz.com/edit/nuxt-nust-example?file=server%2Fnust%2Fcat%2FCat.controller.ts',
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Overview', link: '/guide/overview' },
          { text: 'Setup', link: '/guide/setup' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'Controllers', link: '/features/controllers' },
          { text: 'Providers', link: '/features/providers' },
          { text: 'Guards', link: '/features/guards' },
        ],
      },
      {
        text: 'OpenAPI/Docs',
        items: [
          { text: 'DTOs/Body', link: '/openapi/body' },
          { text: 'Responses', link: '/openapi/responses' },
        ],
      },
      {
        text: 'CLI',
        items: [{ text: 'CRUD Generator', link: '/cli' }],
      },
      {
        text: 'Reference',
        items: [
          {
            text: '@Controller',
          },
          {
            text: 'Route Decorators',
            link: '/reference/route-decorators',
            items: [
              { text: '@Get' },
              { text: '@Post' },
              { text: '@Put' },
              { text: '@Patch' },
              { text: '@Delete' },
              { text: '@Options' },
              { text: '@Head' },
              { text: '@Any' },
            ],
          },
          {
            text: 'Route Parameter Decorators',
            link: '/reference/parameter-decorators',
            items: [
              { text: '@Body' },
              { text: '@RawBody' },
              { text: '@Param' },
              { text: '@Query' },
              { text: '@Ip' },
              { text: 'createCustomParamDecorator' },
            ],
          },
          {
            text: 'Provider Decorators',
            items: [{ text: '@Inject' }],
          },
          {
            text: 'Guard Decorators',
            items: [{ text: '@UseGuards' }],
          },
          {
            text: 'OpenAPI/Doc Decorators',
            items: [
              { text: '@ApiSchema' },
              { text: '@ApiProperty' },

              { text: '@ApiResponse' },
              {
                text: 'Response Shorthands',
                items: [
                  { text: '@ApiOkResponse' },
                  { text: '@ApiCreatedResponse' },
                  { text: '@ApiAcceptedResponse' },
                  { text: '@ApiNoContentResponse' },
                  { text: '@ApiMovedPermanentlyResponse' },
                  { text: '@ApiFoundResponse' },
                  { text: '@ApiBadRequestResponse' },
                  { text: '@ApiUnauthorizedResponse' },
                  { text: '@ApiForbiddenResponse' },
                  { text: '@ApiNotFoundResponse' },
                  { text: '@ApiMethodNotAllowedResponse' },
                  { text: '@ApiNotAcceptableResponse' },
                  { text: '@ApiRequestTimeoutResponse' },
                  { text: '@ApiConflictResponse' },
                ],
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sweetscript/nuxt-nust',
      },
    ],
  },
});
