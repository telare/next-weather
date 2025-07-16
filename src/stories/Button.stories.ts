import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "@/shared/components/btns/Button";
import { fn, userEvent, within, expect } from "storybook/test";

import { windIcon } from "@/utils/Icons";
import buttonStyles from "./utils/Button.module.scss";
// Acts as the central hub for metadata, configuration,
// and defaults that apply to all the stories of a particular component
const meta = {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A versatile button component used throughout the application.",
      },
    },
    layout: "centered",
    // backgrounds: {
    //   values: [
    //     { name: "light", value: "#fff" },
    //     { name: "dark", value: "#333" },
    //     { name: "blue", value: "#add8e6" },
    //   ],
    // },
  },
  args: {
    dataCyPrefix: "story",
    func: fn(),
    className: buttonStyles.default,
  },
  argTypes: {
    text: {
      control: "text",
      description: "The text content for the component.",
    },
    image: {
      control: "object",
      description: "The button image (Next.js Image props)",
    },
    icon: {
      control: "object",
      description: "The button icon (React Element)",
    },
    ariaLabel: {
      control: "text",
      description: "The ARIA label for accessibility",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
    },
    dataCyPrefix: {
      control: "text",
      description: "Prefix for data-cy attribute for testing",
    },
    type: {
      control: "select",
      description: "Type of button",
      options: ["button", "submit", "reset"],
    },
    func: {
      description: "The function for onclick event",
      action: "clicked",
    },
  },
} satisfies Meta<typeof Button>;

type ButtonStory = StoryObj<typeof meta>;

const Primary: ButtonStory = {
  args: {
    text: "Primary button",
  },
  parameters: {
    docs: {
      description: {
        story: "This a button with default story args",
      },
    },
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Clicking on the button", async () => {
      const button = await canvas.findByRole("button");
      await userEvent.click(button);
      expect(args.func).toHaveBeenCalled();
      expect(args.text).toBe("Primary button");
    });
  },
};
const NoContent: ButtonStory = {
  storyName: "Without content",
  args: {
    text: undefined,
    image: undefined,
    icon: undefined,
    dataCyPrefix: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "This a button without content",
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

// single feature only
const TextOnly: ButtonStory = {
  storyName: "Only text",
  args: {
    text: "Text-only button",
  },
  parameters: {
    docs: {
      description: {
        story: "This a button only with text",
      },
    },
  },
};
const ImageOnly: ButtonStory = {
  storyName: "Only image",
  args: {
    image: {
      src: "/img/favicon.png",
      alt: "Image-only variant",
      height: 50,
      width: 50,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "This a button only with image",
      },
    },
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Check if the button is rendered", async () => {
      const button = await canvas.findByRole("button");
      expect(button).toBeInTheDocument();
    });
    await step("Verify the image element and its attributes", async () => {
      const buttomImage = await canvas.findByRole("img");
      expect(buttomImage).toBeInTheDocument();
      // expect(buttomImage).toHaveAttribute("src", args.image?.src);
      expect(buttomImage).toHaveAttribute(
        "alt",
        `${args.image?.alt} button image`
      );
      expect(buttomImage).toHaveAttribute("height", String(args.image?.height));
      expect(buttomImage).toHaveAttribute("width", String(args.image?.width));
    });
  },
};
const IconOnly: ButtonStory = {
  storyName: "Only icon",
  args: {
    icon: windIcon,
  },
  parameters: {
    docs: {
      description: {
        story: "This a button only with icon",
      },
    },
    a11y: {
      test: "todo",
    },
  },
};
const ClassNameOnly: ButtonStory = {
  storyName: "Only classname",
  args: {
    className: buttonStyles.specific,
  },
  parameters: {
    docs: {
      description: {
        story: "This a button only with the specific classname",
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

// combination of features
const TextWithImage: ButtonStory = {
  storyName: "Text & image",
  args: {
    text: "Text with image button",
    image: {
      src: "/img/favicon.png",
      alt: "Image-only variant",
      height: 25,
      width: 25,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "This a button with a text and an image",
      },
    },
  },
};
const TextWithIcon: ButtonStory = {
  storyName: "Text & icon",
  args: {
    text: "Text with icon button",
    icon: windIcon,
  },
  parameters: {
    docs: {
      description: {
        story: "This a button with a text and an icon",
      },
    },
  },
};
const TextWithIconImage: ButtonStory = {
  storyName: "Text, icon & image",
  args: {
    text: "Text with icon & image button",
    image: {
      src: "/img/favicon.png",
      alt: "Image-only variant",
      height: 25,
      width: 25,
    },
    icon: windIcon,
  },
  parameters: {
    docs: {
      description: {
        story: "This a button with a text, an icon and an image",
      },
    },
  },
};

// order matters
export {
  Primary,
  TextOnly,
  ImageOnly,
  IconOnly,
  ClassNameOnly,
  TextWithImage,
  TextWithIcon,
  TextWithIconImage,
  NoContent,
};
export default meta;
