if (!issue) {
  notFound();
}

// вот так делается перевод на notFound c
import { notFound } from 'next/navigation'|

// и импорт сверху


export default async function IssuePage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params
    const issue = await getIssue(parseInt(id))
parseInt(id ) 
// нужно переделывать строку в число, как в бд для поиска
