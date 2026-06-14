import { PageWrapper } from "@/components/layout/page-wrapper";
import { TodoBoard } from "@/components/todo/todo-board";
import { getTodoGroups } from "@/app/lib/todo-service";

export default async function TodoPage() {
  const groups = await getTodoGroups();

  return (
    <PageWrapper>
      <TodoBoard initialGroups={groups} />
    </PageWrapper>
  );
}
