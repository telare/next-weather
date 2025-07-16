// import "@shared/styles/global.scss";
import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "@/providers/themeProvider";

// This file runs before all your stories and acts as a global wrapper
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
    },
  },
  // Global decorators are good for contex wrappers, extra markup, 
  // context as a second parameter give access to Story's args and meta info,
  // so can be used for dynamically rendreding or wrapping story in some context 
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
