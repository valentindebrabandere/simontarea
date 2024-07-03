import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "dist",
  },
  media: {
    tina: {
      mediaRoot: "/assets/img",
      publicFolder: "dist",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "home",
        label: "Homepage",
        path: "src/content/pages/",
        fields: [

          {
            type: "object",
            name: "meta",
            label: "Meta données",
            description: "Meta données de la page servent au référencement SEO",

            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Meta description",
              },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",

            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
              },
              {
                type: "image",
                name: "image",
                label: "Image",
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Alt text",
                description: "Le texte alternatif de l'image",
              }
            ],
          },
        ],
      },
      {
        name: "mainnav",
        label: "Main Navigation",
        path: "src/content/navigation/",
        fields: [
          {
            type: "object",
            list: true,
            name: "items",
            label: "Navigation Items",
            fields: [
              {
                type: "string",
                name: "label",
                label: "Label",
              },
              {
                type: "string",
                name: "trigger",
                label: "Trigger",
              },
              {
                type: "string",
                name: "url",
                label: "URL",
              },
            ],
          },
        ],
      }
    ],
  },
});
