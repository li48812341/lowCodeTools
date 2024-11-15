
import Image from "next/image";
import { generateBody, generateInterface } from "../sdk/babel";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className="text-center">
        {generateInterface()}
        {generateBody()}
      </p>

    </main>
  );
}
