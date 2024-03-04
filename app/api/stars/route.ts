import { Repo } from "../../entity/repo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user");
  const page = searchParams.get("page");

  if (!user) {
    return new Response("get invalid user", {
      status: 400,
    });
  }

  try {
    // 注意：GitHub API的starred仓库端点不支持直接的分页参数
    const res = await fetch(
      `https://api.github.com/users/${user}/starred?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return new Response(res.statusText, {
        status: res.status,
      });
    }

    const data = await res.json();
    const repos: Repo[] = data.map(
      (item: any): Repo => ({
        id: item.id,
        title: item.name,
        description: item.description || "No description provided",
        imageUrl: item.owner.avatar_url,
        repositoryUrl: item.html_url,
      })
    );

    return Response.json(repos);
  } catch (error) {
    return new Response("Internal server error", {
      status: 500,
    });
  }
}
