import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Odyssey of the Dragonlords",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "andrewmsweet.com/daggerheart-odyssey",
    // The Obsidian vault lives at the repo root, so Quartz is built with `-d .`.
    // These patterns keep build artifacts, Quartz internals, Obsidian state,
    // and anything under `private/` out of the published site.
    ignorePatterns: [
      "private",
      "templates",
      ".obsidian",
      "quartz",
      "node_modules",
      "public",
      ".quartz-cache",
      ".github",
      "package.json",
      "package-lock.json",
      "tsconfig.json",
      "globals.d.ts",
      "index.d.ts",
      "quartz.config.ts",
      "quartz.layout.ts",
      "Dockerfile",
      ".prettierrc",
      ".prettierignore",
      ".gitattributes",
      ".gitignore",
      ".node-version",
      ".npmrc",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f4efe2",
          lightgray: "#e6dcc6",
          gray: "#c9bfa8",
          darkgray: "#5a4a3b",
          dark: "#2e241c",
          secondary: "#7a1f1f",
          tertiary: "#b0893b",
          highlight: "rgba(122, 31, 31, 0.08)",
          textHighlight: "#d4af37aa",
        },
        darkMode: {
          light: "#f4efe2",
          lightgray: "#e6dcc6",
          gray: "#c9bfa8",
          darkgray: "#5a4a3b",
          dark: "#2e241c",
          secondary: "#7a1f1f",
          tertiary: "#b0893b",
          highlight: "rgba(122, 31, 31, 0.08)",
          textHighlight: "#d4af37aa",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
