"use client";

// app/stars/page.tsx
import { useState, useEffect, useRef } from "react";
import Card from "../components/Card"; // 根据你的项目结构调整路径
import { Repo } from "../entity/repo";
import { useUserStore } from "../../store";

const StarsPage = () => {
  const [stars, setStars] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(-1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastStarElementRef = useRef(null);
  const username = useUserStore((state) => state.username);

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
  }, [stars]);

  useEffect(() => {
    const fetchStars = async () => {
      const response = await fetch(`/api/stars?user=${username}&page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stars: " + response.statusText);
      }
      const data = await response.json();
      console.log("page: %s", page);
      console.log("data: ", data);
      setStars((prevStars) => [...prevStars, ...data]);
      setCount(data.length);
    };

    fetchStars();
  }, [page]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stars.map((star, index) => (
        <Card
          key={star.id}
          title={star.title}
          description={star.description || "No description provided"}
          imageUrl={star.imageUrl}
          repositoryUrl={star.repositoryUrl}
          ref={index === stars.length - 1 ? lastStarElementRef : null}
        />
      ))}
    </div>
  );
};

export default StarsPage;
