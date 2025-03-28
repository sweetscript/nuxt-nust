import { defineConfig } from 'vitepress';

const cfToken = process.env.VITE_CF_TOKEN;
console.log('cfToken', cfToken);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nust',
  description:
    'A Nuxt module that provides NestJS-like features to your Nuxt backend',
  srcDir: './src',
  vite: {
    envPrefix: 'VITE_',
  },
  head: [
    ['link', { rel: 'icon', href: '/nuxt-nust/favicon.ico' }],
    ...(cfToken
      ? [
          [
            'script',
            {
              src: `https://static.cloudflareinsights.com/beacon.min.js?token=${cfToken}`,
              defer: 'true',
            },
          ],
        ]
      : []),
  ],
  base: '/nuxt-nust/',

  markdown: {
    theme: 'material-theme',
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo.svg',
      dark: '/logo-invert.svg',
      alt: 'logo',
    },
    siteTitle: false,

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Maintained by Majid K - majid@sweetscript.com',
    },

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
        collapsed: false,
        items: [
          { text: 'Overview', link: '/guide/overview' },
          { text: 'Setup', link: '/guide/setup' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
      {
        text: 'Features',
        collapsed: false,
        items: [
          { text: 'Controllers', link: '/features/controllers' },
          { text: 'Providers', link: '/features/providers' },
          { text: 'Guards', link: '/features/guards' },
          { text: 'Validation', link: '/features/validation' },
          { text: 'Serialization', link: '/features/serialization' },
        ],
      },
      {
        text: 'OpenAPI/Docs',
        collapsed: false,
        items: [
          { text: 'DTOs/Body', link: '/openapi/body' },
          { text: 'Responses', link: '/openapi/responses' },
        ],
      },
      {
        text: 'CLI',
        collapsed: false,
        items: [{ text: 'CRUD Generator', link: '/cli' }],
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          {
            text: '@Controller',
            link: '/reference/controller-decorators#@Controller',
          },
          {
            text: 'Route Decorators',
            link: '/reference/controller-decorators#RouteDecorators',
            collapsed: false,
            items: [
              {
                text: '@Get',
                link: '/reference/controller-decorators#@Get',
              },
              {
                text: '@Post',
                link: '/reference/controller-decorators#@Post',
              },
              {
                text: '@Put',
                link: '/reference/controller-decorators#@Put',
              },
              {
                text: '@Patch',
                link: '/reference/controller-decorators#@Patch',
              },
              {
                text: '@Delete',
                link: '/reference/controller-decorators#@Delete',
              },
              {
                text: '@Options',
                link: '/reference/controller-decorators#@Options',
              },
              {
                text: '@Head',
                link: '/reference/controller-decorators#@Head',
              },
              {
                text: '@Any',
                link: '/reference/controller-decorators#@Any',
              },
            ],
          },
          {
            text: 'Route Parameter Decorators',
            link: '/reference/parameter-decorators',
            collapsed: false,
            items: [
              {
                text: '@Param',
                link: '/reference/parameter-decorators#@Param',
              },
              {
                text: '@Body',
                link: '/reference/parameter-decorators#@Body',
              },
              {
                text: '@RawBody',
                link: '/reference/parameter-decorators#@RawBody',
              },
              {
                text: '@Query',
                link: '/reference/parameter-decorators#@Query',
              },
              {
                text: '@Ip',
                link: '/reference/parameter-decorators#@Ip',
              },
              {
                text: 'createCustomParamDecorator',
                link: '/reference/parameter-decorators#@createCustomParamDecorator',
              },
            ],
          },
          {
            text: 'Provider Decorators',
            link: '/reference/provider-decorators',
            collapsed: false,
            items: [
              {
                text: '@Inject',
                link: '/reference/provider-decorators#@Inject',
              },
            ],
          },
          {
            text: 'Guard Decorators',
            collapsed: false,
            link: '/reference/guard-decorators',
            items: [
              {
                text: '@UseGuards',
                link: '/reference/guard-decorators#@UseGuards',
              },
            ],
          },
          {
            text: 'OpenAPI/Doc Decorators',
            collapsed: false,
            link: '/reference/openapi',
            items: [
              {
                text: '@ApiSchema',
                link: '/reference/openapi#@ApiSchema',
              },
              {
                text: '@ApiProperty',
                link: '/reference/openapi#@ApiProperty',
              },

              {
                text: '@ApiResponse',
                link: '/reference/openapi#@ApiResponse',
              },
              {
                text: 'Response Shorthands',
                collapsed: false,
                items: [
                  {
                    text: '@ApiOkResponse',
                    link: '/reference/openapi#@ApiOkResponse',
                  },
                  {
                    text: '@ApiCreatedResponse',
                    link: '/reference/openapi#@ApiCreatedResponse',
                  },
                  {
                    text: '@ApiAcceptedResponse',
                    link: '/reference/openapi#@ApiAcceptedResponse',
                  },
                  {
                    text: '@ApiNoContentResponse',
                    link: '/reference/openapi#@ApiNoContentResponse',
                  },
                  {
                    text: '@ApiMovedPermanentlyResponse',
                    link: '/reference/openapi#@ApiMovedPermanentlyResponse',
                  },
                  {
                    text: '@ApiFoundResponse',
                    link: '/reference/openapi#@ApiFoundResponse',
                  },
                  {
                    text: '@ApiBadRequestResponse',
                    link: '/reference/openapi#@ApiBadRequestResponse',
                  },
                  {
                    text: '@ApiUnauthorizedResponse',
                    link: '/reference/openapi#@ApiUnauthorizedResponse',
                  },
                  {
                    text: '@ApiForbiddenResponse',
                    link: '/reference/openapi#@ApiForbiddenResponse',
                  },
                  {
                    text: '@ApiNotFoundResponse',
                    link: '/reference/openapi#@ApiNotFoundResponse',
                  },
                  {
                    text: '@ApiMethodNotAllowedResponse',
                    link: '/reference/openapi#@ApiMethodNotAllowedResponse',
                  },
                  {
                    text: '@ApiNotAcceptableResponse',
                    link: '/reference/openapi#@ApiNotAcceptableResponse',
                  },
                  {
                    text: '@ApiRequestTimeoutResponse',
                    link: '/reference/openapi#@ApiRequestTimeoutResponse',
                  },
                  {
                    text: '@ApiConflictResponse',
                    link: '/reference/openapi#@ApiConflictResponse',
                  },
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
