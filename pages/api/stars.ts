// pages/api/stars.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Repo } from '../../app/entity/repo';
import { headers } from 'next/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 const { user, page = '1' } = req.query;

 if (!user) {
    return res.status(400).json({ error: 'User parameter is required' });
 }

 try {
    // 注意：GitHub API的starred仓库端点不支持直接的分页参数
   const response = await fetch(`https://api.github.com/users/${user}/starred?page=${page}`, {
 headers: {
    'Authorization': `token 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`
 }
});

    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    const repos: Repo[] = data.map((item: any): Repo => ({
      id: item.id,
      title: item.name,
      description: item.description || "No description provided",
      imageUrl: item.owner.avatar_url,
      repositoryUrl: item.html_url,
  }));

    return res.status(200).json(repos);
 } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
 }
}
