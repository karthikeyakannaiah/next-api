import { InferGetServerSidePropsType } from "next";
import Navbar from "../components/Navbar";

export async function getServerSideProps(context: Object) {
  try {
    const res = await fetch("http://localhost:3000/api/get-feed");
    const content = await res.json();
    return {
      props: {content:content},
    };
  } catch (e) {
    console.error(e);
    return {
      props: {content:"404"},
    };
  }
}

export default function Home({content}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(content);
  return (<>
    <Navbar></Navbar>
    
  </>);
}
