"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "codepath.progress.v1";
const UPDATE_EVENT = "codepath:progress-update";

const EMPTY_PROGRESS: LessonProgress = new Map();

export type LessonProgress = ReadonlyMap<string, ReadonlySet<number>>;

const noopSubscribe = () => () => {};

export function useIsClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function progressKey(lessonSlug: string, topicSlug: string): string {
  return `${lessonSlug}:${topicSlug}`;
}

let snapshot: LessonProgress | null;

function parseStore(): LessonProgress {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const map = new Map<string, Set<number>>();
    for (const [key, value] of Object.entries(parsed)) {
      if (!Array.isArray(value)) continue;
      const pages = value.filter((p): p is number =>
        Number.isInteger(p) && p >= 1,
      );
      map.set(key, new Set(pages));
    }
    return map;
  } catch {
    return EMPTY_PROGRESS;
  }
}

function getSnapshot(): LessonProgress {
  if (!snapshot) snapshot = parseStore();
  return snapshot;
}

function subscribe(onChange: () => void): () => void {
  const refresh = () => {
    snapshot = null;
    onChange();
  };
  window.addEventListener("storage", refresh);
  window.addEventListener(UPDATE_EVENT, refresh);
  return () => {
    window.removeEventListener("storage", refresh);
    window.removeEventListener(UPDATE_EVENT, refresh);
  };
}

export function markPageVisited(
  lessonSlug: string,
  topicSlug: string,
  page: number,
): void {
  if (typeof window === "undefined") return;
  const next = new Map<string, Set<number>>();
  for (const [key, pages] of getSnapshot()) next.set(key, new Set(pages));
  const topicKey = progressKey(lessonSlug, topicSlug);
  const visited = next.get(topicKey) ?? new Set<number>();
  visited.add(page);
  next.set(topicKey, visited);
  try {
    const serialized: Record<string, number[]> = {};
    for (const [key, pages] of next) serialized[key] = [...pages];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch {
    // storage unavailable (private mode / quota): keep in-memory progress
  }
  snapshot = next;
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function useLessonProgress(): LessonProgress {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_PROGRESS);
}

export function useTopicPagesVisited(
  lessonSlug: string,
  topicSlug: string,
): ReadonlySet<number> {
  const progress = useLessonProgress();
  return progress.get(progressKey(lessonSlug, topicSlug)) ?? EMPTY_SET;
}
const EMPTY_SET: ReadonlySet<number> = new Set();

export function useLessonProgressStats(
  lessonSlug: string,
  topics: { slug: string; total: number }[],
): { visited: number; total: number } {
  const progress = useLessonProgress();
  let visited = 0;
  let total = 0;
  for (const { slug, total: topicTotal } of topics) {
    visited += Math.min(
      progress.get(progressKey(lessonSlug, slug))?.size ?? 0,
      topicTotal,
    );
    total += topicTotal;
  }
  return { visited, total };
}

export function useResumeTopic(
  lessonSlug: string,
  topics: { slug: string; total: number }[],
): { topicSlug: string; page: number } | null {
  const progress = useLessonProgress();
  for (const { slug, total } of topics) {
    const visited = progress.get(progressKey(lessonSlug, slug));
    for (let page = 1; page <= total; page++) {
      if (!visited?.has(page)) return { topicSlug: slug, page };
    }
  }
  return null;
}
