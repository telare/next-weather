export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  query: {},
  pathname: "/",
  asPath: "/",
  route: "/",
  isReady: true,
  basePath: "",
  isLocaleDomain: false,
  isPreview: false,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
});
export const useSearchParams = () => new URLSearchParams();