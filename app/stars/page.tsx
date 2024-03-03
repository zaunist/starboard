"use client";
import { useState, useEffect, useRef } from "react";
import Card from "../components/Card"; // 根据你的项目结构调整路径
import { Repo } from "../entity/repo";
import { useSession } from "next-auth/react";

const StarsPage = () => {
  const [stars, setStars] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(-1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastStarElementRef = useRef(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    // 确保在客户端运行
    if (typeof window === "undefined") return;

    // 设置 IntersectionObserver
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && count > 0) {
        console.log("Intersection detected:", entries[0].isIntersecting);
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastStarElementRef.current) {
      observer.current.observe(lastStarElementRef.current);
    }
  }, [stars, count]);

  useEffect(() => {
    const fetchStars = async () => {
      if (status === "authenticated") {
        const username = session?.user?.name;
        const response = await fetch(
          `/api/stars?user=${username}&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stars: " + response.statusText);
        }
        const data = await response.json();
        setStars((prevStars) => [...prevStars, ...data]);
        setCount(data.length);
      }
    };

    // 仅在用户登录时触发数据获取
    if (status === "authenticated") {
      fetchStars();
    }
  }, [page, status, session]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {status !== "authenticated" ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-4xl bg-white shadow-lg p-6 rounded">
          <p>请登录以获取 star 列表</p>
        </div>
      ) : (
        stars.map((star, index) => (
          <Card
            key={star.id}
            title={star.title}
            description={star.description || "No description provided"}
            imageUrl={star.imageUrl}
            repositoryUrl={star.repositoryUrl}
            ref={index === stars.length - 1 ? lastStarElementRef : null}
          />
        ))
      )}
    </div>
  );
};

export default StarsPage;
