import dynamic from "next/dynamic";

const Component = ({ children }) => {
  return <>{children}</>;
};

const WithNoSSR = dynamic(
  () => {
    return Promise.resolve(Component);
  },
  { ssr: false }
);

export default WithNoSSR;
