import { defineConfig } from "tinacms";

export default defineConfig({
  build: {
    outputFolder: "admin", // The folder where the admin UI will be built
    publicFolder: "dist",  // The folder where public assets are stored
  },
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
              },
            ],
          },
        ],
      },
    ],
  },
});