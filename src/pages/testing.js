import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Link from "next/link";

export default function ReadMore() {
  const router = useRouter();

  const post = {
    id: "bidemi",
    name: "Bidemi",
  };

  return <Link href="/adebayo moremi">Click here to read more</Link>;
}
