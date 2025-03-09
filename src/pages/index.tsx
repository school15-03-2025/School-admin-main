// pages/index.tsx
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/auth/login", //comment change to /dashboard
      permanent: false, // Set to true if this redirect is permanent
    },
  };
};

export default function Home() {
  return null;
}
