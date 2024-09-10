
import Image from "next/image";
import { generateYonyou } from "../sdk/babel";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className="text-center">
        {generateYonyou({
          "Content-Type": "application",
          "Bearer":"Bearer XXXXXXXXX"
        },{
          page: "1",
          pageSize: "10",
          test:{
            test2:{
              test3:4
            }
          }
        },"https://xxxxx.com")}
      </p>

    </main>
  );
}
