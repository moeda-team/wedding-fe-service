"use client";

import { useState, type CSSProperties } from "react";
import { CirclePlus, GripVertical, Pencil, Trash2 } from "lucide-react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  completeItemAction,
  createGroupAction,
  createItemAction,
  deleteGroupAction,
  deleteItemAction,
  renameGroupAction,
  reorderItemsAction,
  updateItemAction,
} from "@/app/lib/todo-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  PRIORITY_BADGE_LABEL,
  PRIORITY_META,
  PRIORITY_ORDER,
  type TodoGroup,
  type TodoItem,
  type TodoPriority,
} from "@/types/todo-interface";

type ListDialogState = {
  open: boolean;
  groupId: string | null;
  itemId: string | null;
  title: string;
  description: string;
  priority: TodoPriority;
  saving: boolean;
  error: string | null;
};

type GroupDialogState = {
  open: boolean;
  groupId: string | null;
  name: string;
  saving: boolean;
  error: string | null;
};

const EMPTY_LIST_DIALOG: ListDialogState = {
  open: false,
  groupId: null,
  itemId: null,
  title: "",
  description: "",
  priority: "LOW",
  saving: false,
  error: null,
};

const EMPTY_GROUP_DIALOG: GroupDialogState = {
  open: false,
  groupId: null,
  name: "",
  saving: false,
  error: null,
};

export function TodoBoard({ initialGroups }: { initialGroups: TodoGroup[] }) {
  const [groups, setGroups] = useState<TodoGroup[]>(initialGroups);
  const [boardError, setBoardError] = useState<string | null>(null);
  const [listDialog, setListDialog] =
    useState<ListDialogState>(EMPTY_LIST_DIALOG);
  const [groupDialog, setGroupDialog] =
    useState<GroupDialogState>(EMPTY_GROUP_DIALOG);

  /* ----------------------------- group actions ---------------------------- */

  function openAddGroup() {
    setGroupDialog({ ...EMPTY_GROUP_DIALOG, open: true });
  }

  function openEditGroup(group: TodoGroup) {
    setGroupDialog({
      ...EMPTY_GROUP_DIALOG,
      open: true,
      groupId: group.id,
      name: group.name,
    });
  }

  async function saveGroup() {
    const name = groupDialog.name.trim();
    if (!name) return;

    setGroupDialog((prev) => ({ ...prev, saving: true, error: null }));

    const res = groupDialog.groupId
      ? await renameGroupAction({ id: groupDialog.groupId, name })
      : await createGroupAction({ name });

    if (!res.ok) {
      setGroupDialog((prev) => ({ ...prev, saving: false, error: res.error }));
      return;
    }

    setGroups((prev) =>
      groupDialog.groupId
        ? prev.map((g) =>
            g.id === res.data.id ? { ...g, name: res.data.name } : g,
          )
        : [...prev, res.data],
    );
    setGroupDialog(EMPTY_GROUP_DIALOG);
  }

  async function deleteGroup(group: TodoGroup) {
    if (
      !window.confirm(
        `Hapus grup "${group.name}" beserta semua list di dalamnya?`,
      )
    ) {
      return;
    }

    setBoardError(null);
    const snapshot = groups;
    setGroups((prev) => prev.filter((g) => g.id !== group.id)); // optimistic

    const res = await deleteGroupAction({ id: group.id });
    if (!res.ok) {
      setGroups(snapshot); // revert
      setBoardError(res.error);
    }
  }

  /* ----------------------------- list actions ----------------------------- */

  function openAddItem(groupId: string) {
    setListDialog({ ...EMPTY_LIST_DIALOG, open: true, groupId });
  }

  function openEditItem(groupId: string, item: TodoItem) {
    setListDialog({
      ...EMPTY_LIST_DIALOG,
      open: true,
      groupId,
      itemId: item.id,
      title: item.title,
      description: item.description,
      priority: item.priority,
    });
  }

  async function saveItem() {
    const title = listDialog.title.trim();
    if (!title || !listDialog.groupId) return;

    setListDialog((prev) => ({ ...prev, saving: true, error: null }));
    const description = listDialog.description.trim();

    const res = listDialog.itemId
      ? await updateItemAction({
          id: listDialog.itemId,
          title,
          description,
          priority: listDialog.priority,
        })
      : await createItemAction({
          groupId: listDialog.groupId,
          title,
          description,
          priority: listDialog.priority,
        });

    if (!res.ok) {
      setListDialog((prev) => ({ ...prev, saving: false, error: res.error }));
      return;
    }

    const groupId = listDialog.groupId;
    const itemId = listDialog.itemId;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          items: itemId
            ? g.items.map((it) => (it.id === itemId ? res.data : it))
            : [...g.items, res.data],
        };
      }),
    );
    setListDialog(EMPTY_LIST_DIALOG);
  }

  async function deleteItem(groupId: string, item: TodoItem) {
    setBoardError(null);
    const snapshot = groups;
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, items: g.items.filter((it) => it.id !== item.id) }
          : g,
      ),
    ); // optimistic

    const res = await deleteItemAction({ id: item.id });
    if (!res.ok) {
      setGroups(snapshot);
      setBoardError(res.error);
    }
  }

  async function toggleItem(groupId: string, item: TodoItem, done: boolean) {
    setBoardError(null);
    const snapshot = groups;
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              items: g.items.map((it) =>
                it.id === item.id ? { ...it, done } : it,
              ),
            }
          : g,
      ),
    ); // optimistic

    const res = await completeItemAction({ id: item.id, isCompleted: done });
    if (!res.ok) {
      setGroups(snapshot);
      setBoardError(res.error);
    }
  }

  async function reorderItems(groupId: string, orderedIds: string[]) {
    setBoardError(null);
    const snapshot = groups;

    // optimistic: reorder this group's items to match the new id order
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const byId = new Map(g.items.map((it) => [it.id, it]));
        const next = orderedIds
          .map((id) => byId.get(id))
          .filter((it): it is TodoItem => Boolean(it));
        return { ...g, items: next };
      }),
    );

    const res = await reorderItemsAction({ groupId, orderedItemIds: orderedIds });
    if (!res.ok) {
      setGroups(snapshot); // revert
      setBoardError(res.error);
    }
  }

  /* -------------------------------- render -------------------------------- */

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION HEADER */}
      <div className="flex flex-col gap-4 rounded-3xl bg-white/50 px-2 py-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-[#2f2623]">
            Checklist Persiapan Undangan
          </h2>
          <p className="text-sm text-muted-foreground">
            Pantau dan selesaikan langkah-langkah penting untuk menyiapkan
            undangan digital Anda.
          </p>
        </div>

        <Button
          onClick={openAddGroup}
          className="shrink-0 bg-[#1c1c1c] px-5 text-white hover:bg-[#1c1c1c]/90"
        >
          <CirclePlus className="size-4" />
          Tambah Grup List
        </Button>
      </div>

      {boardError && (
        <div className="rounded-2xl border border-[#e0483d]/30 bg-[#e0483d]/10 px-4 py-3 text-sm text-[#b3392f]">
          {boardError}
        </div>
      )}

      {/* GROUPS */}
      {groups.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#e3dcd8] bg-white/60 px-6 py-12 text-center text-sm text-muted-foreground">
          Belum ada grup. Klik{" "}
          <span className="font-medium text-[#2f2623]">Tambah Grup List</span>{" "}
          untuk membuat checklist pertama Anda.
        </div>
      ) : (
        groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onAddItem={() => openAddItem(group.id)}
            onEditGroup={() => openEditGroup(group)}
            onDeleteGroup={() => deleteGroup(group)}
            onToggleItem={(item, done) => toggleItem(group.id, item, done)}
            onEditItem={(item) => openEditItem(group.id, item)}
            onDeleteItem={(item) => deleteItem(group.id, item)}
            onReorder={(orderedIds) => reorderItems(group.id, orderedIds)}
          />
        ))
      )}

      {/* ADD / EDIT LIST ITEM DIALOG */}
      <Dialog
        open={listDialog.open}
        onOpenChange={(open) =>
          setListDialog((prev) =>
            open ? prev : prev.saving ? prev : EMPTY_LIST_DIALOG,
          )
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {listDialog.itemId ? "Edit List" : "Tambah List Baru"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi judul, deskripsi, dan prioritas untuk list ini.
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              void saveItem();
            }}
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="todo-title">Judul</Label>
              <Input
                id="todo-title"
                placeholder="Pengaturan Undangan"
                value={listDialog.title}
                onChange={(e) =>
                  setListDialog((prev) => ({ ...prev, title: e.target.value }))
                }
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="todo-desc">Deskripsi</Label>
              <Textarea
                id="todo-desc"
                placeholder="Sesuaikan tampilan undangan digital Anda mulai dari tema, foto, font, warna, wording, hingga urutan section."
                value={listDialog.description}
                onChange={(e) =>
                  setListDialog((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Prioritas</Label>
              <Select
                value={listDialog.priority}
                onValueChange={(value) =>
                  setListDialog((prev) => ({
                    ...prev,
                    priority: value as TodoPriority,
                  }))
                }
              >
                <SelectTrigger className="w-full bg-input/50">
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_ORDER.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      <span
                        className={cn(
                          "size-2.5 rounded-full",
                          PRIORITY_META[priority].dot,
                        )}
                      />
                      {PRIORITY_META[priority].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {listDialog.error && (
              <p className="text-sm text-[#e0483d]">{listDialog.error}</p>
            )}

            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="outline"
                disabled={listDialog.saving}
                onClick={() => setListDialog(EMPTY_LIST_DIALOG)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={listDialog.saving}
                className="bg-[#1c1c1c] text-white hover:bg-[#1c1c1c]/90"
              >
                {listDialog.saving
                  ? "Menyimpan..."
                  : listDialog.itemId
                    ? "Simpan"
                    : "Tambah List"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ADD / EDIT GROUP DIALOG */}
      <Dialog
        open={groupDialog.open}
        onOpenChange={(open) =>
          setGroupDialog((prev) =>
            open ? prev : prev.saving ? prev : EMPTY_GROUP_DIALOG,
          )
        }
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {groupDialog.groupId ? "Edit Grup" : "Tambah Grup List"}
            </DialogTitle>
            <DialogDescription>
              Beri nama grup untuk mengelompokkan list Anda.
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              void saveGroup();
            }}
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="group-name">Nama Grup</Label>
              <Input
                id="group-name"
                placeholder="cth. Design Undangan"
                value={groupDialog.name}
                onChange={(e) =>
                  setGroupDialog((prev) => ({ ...prev, name: e.target.value }))
                }
                autoFocus
              />
            </div>

            {groupDialog.error && (
              <p className="text-sm text-[#e0483d]">{groupDialog.error}</p>
            )}

            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="outline"
                disabled={groupDialog.saving}
                onClick={() => setGroupDialog(EMPTY_GROUP_DIALOG)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={groupDialog.saving}
                className="bg-[#1c1c1c] text-white hover:bg-[#1c1c1c]/90"
              >
                {groupDialog.saving
                  ? "Menyimpan..."
                  : groupDialog.groupId
                    ? "Simpan"
                    : "Tambah Grup"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ------------------------------- group card ------------------------------- */

function GroupCard({
  group,
  onAddItem,
  onEditGroup,
  onDeleteGroup,
  onToggleItem,
  onEditItem,
  onDeleteItem,
  onReorder,
}: {
  group: TodoGroup;
  onAddItem: () => void;
  onEditGroup: () => void;
  onDeleteGroup: () => void;
  onToggleItem: (item: TodoItem, done: boolean) => void;
  onEditItem: (item: TodoItem) => void;
  onDeleteItem: (item: TodoItem) => void;
  onReorder: (orderedIds: string[]) => void;
}) {
  // Require a small drag distance so clicking the handle area doesn't start a
  // drag, and keep checkbox/edit/delete clicks intact.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ids = group.items.map((it) => it.id);
    const from = ids.indexOf(active.id as string);
    const to = ids.indexOf(over.id as string);
    if (from === -1 || to === -1) return;

    onReorder(arrayMove(ids, from, to));
  }

  return (
    <section className="rounded-3xl bg-card p-5 shadow-md ring-1 ring-foreground/5">
      {/* GROUP HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-[#2f2623]">{group.name}</h3>

        <div className="flex items-center gap-2">
          <Button
            onClick={onAddItem}
            className="bg-[#1c1c1c] text-white hover:bg-[#1c1c1c]/90"
          >
            <CirclePlus className="size-4" />
            Tambah List
          </Button>
          <Button variant="outline" onClick={onEditGroup}>
            <Pencil className="size-4" />
            Edit
          </Button>
          <Button
            onClick={onDeleteGroup}
            className="bg-[#e0483d] text-white hover:bg-[#e0483d]/90"
          >
            <Trash2 className="size-4" />
            Hapus
          </Button>
        </div>
      </div>

      {/* ITEMS */}
      <div className="mt-4 flex flex-col gap-3">
        {group.items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#e3dcd8] px-4 py-6 text-center text-sm text-muted-foreground">
            Belum ada list pada grup ini.
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={group.items.map((it) => it.id)}
              strategy={verticalListSortingStrategy}
            >
              {group.items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onToggle={(done) => onToggleItem(item, done)}
                  onEdit={() => onEditItem(item)}
                  onDelete={() => onDeleteItem(item)}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </section>
  );
}

/* -------------------------------- item row -------------------------------- */

function ItemRow({
  item,
  onToggle,
  onEdit,
  onDelete,
}: {
  item: TodoItem;
  onToggle: (done: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const priority = PRIORITY_META[item.priority];
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-[#ece7e4] bg-white px-4 py-3.5",
        isDragging && "relative z-10 shadow-lg ring-1 ring-foreground/10",
      )}
    >
      {/* drag handle */}
      <button
        type="button"
        ref={setActivatorNodeRef}
        aria-label={`Ubah urutan ${item.title}`}
        className="shrink-0 cursor-grab touch-none rounded-md p-0.5 text-[#cbc3bf] transition hover:text-[#8c8480] active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </button>

      <Checkbox
        checked={item.done}
        onCheckedChange={(checked) => onToggle(checked === true)}
        className="shrink-0"
        aria-label={`Tandai ${item.title} selesai`}
      />

      <button
        type="button"
        onClick={onEdit}
        className="min-w-0 flex-1 text-left"
      >
        <p
          className={cn(
            "truncate font-semibold text-[#2f2623]",
            item.done && "text-muted-foreground line-through",
          )}
        >
          {item.title}
        </p>
        {item.description && (
          <p
            className={cn(
              "mt-0.5 truncate text-sm text-muted-foreground",
              item.done && "line-through",
            )}
          >
            {item.description}
          </p>
        )}
      </button>

      <span
        className={cn(
          "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
          priority.badge,
        )}
      >
        {PRIORITY_BADGE_LABEL[item.priority]}
      </span>

      <button
        type="button"
        onClick={onDelete}
        aria-label={`Hapus ${item.title}`}
        className="shrink-0 rounded-full p-2 text-[#e0483d] transition hover:bg-[#e0483d]/10"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
