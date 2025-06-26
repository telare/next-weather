/* eslint-disable @typescript-eslint/no-namespace */

import "./commands";
import "cypress-axe";
import { mount, MountOptions, MountReturn } from "cypress/react";
import { MemoryRouterProps } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import { EnhancedStore, UnknownAction } from "@reduxjs/toolkit";
import { ThemeProvider } from "@/providers/themeProvider";
import { ThemeProviderProps } from "next-themes";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { store } from "@/providers/globalStore";
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithRouter(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<MountReturn>;

      mountWithReduxStore(
        component: React.ReactNode,
        options?: MountOptions & {
          store?: EnhancedStore<unknown, UnknownAction>;
        }
      ): Cypress.Chainable<MountReturn>;

      mountWithAllProviders(
        component: React.ReactNode,
        options?: MountOptions & { navigationProps?: AppRouterInstance } & {
          themeProps?: ThemeProviderProps;
        } & {
          store?: EnhancedStore<unknown, UnknownAction>;
        }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("mountWithAllProviders", (component, options = {}) => {
  const createNavigation = (params: AppRouterInstance) => ({
    back: params.back,
    push: params.push,
    forward: params.forward,
    refresh: params.refresh,
    replace: params.replace,
    prefetch: params.prefetch,
  });
  const navigationProps: AppRouterInstance = options.navigationProps ?? {
    back: cy.stub().as("router:back"),
    push: cy.stub().as("router:push"),
    forward: cy.stub().as("router:forward"),
    refresh: cy.stub().as("router:refresh"),
    replace: cy.stub().as("router:replace"),
    prefetch: cy.stub().as("router:prefetch"),
  };
  const themeProps = options.themeProps;

  const wrappedComponent = (
    <AppRouterContext value={createNavigation(navigationProps)}>
      <ThemeProvider {...themeProps}>
        <Provider store={store}>{component}</Provider>
      </ThemeProvider>
    </AppRouterContext>
  );

  return mount(wrappedComponent, options);
});
